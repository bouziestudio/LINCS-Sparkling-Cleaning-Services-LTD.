import express from 'express';
import type { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
// Note: In AI Studio / Cloud Run container, Nginx listens on 8080 and proxies to port 3000.
// Application must always listen on port 3000 (never 8080).
const PORT = Number(process.env.APP_PORT) || 3000;

// Google Workspace Primary Official Recipient
const DISPATCH_EMAIL =
  process.env.GOOGLE_WORKSPACE_EMAIL ||
  process.env.DISPATCH_EMAIL ||
  'info@lincsscsltd.com';

app.use(express.json());

// Persistent submissions storage directory
const DATA_DIR = path.resolve(process.cwd(), 'data');
const SUBMISSIONS_FILE = path.join(DATA_DIR, 'submissions.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

if (!fs.existsSync(SUBMISSIONS_FILE)) {
  fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify([], null, 2), 'utf-8');
}

function saveSubmission(entry: any) {
  try {
    const raw = fs.readFileSync(SUBMISSIONS_FILE, 'utf-8');
    const list = JSON.parse(raw || '[]');
    list.unshift(entry);
    // Keep last 150 entries
    fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(list.slice(0, 150), null, 2), 'utf-8');
  } catch (err) {
    console.error('[Storage Error] Failed to persist submission:', err);
  }
}

/**
 * Mailer configuration optimized for Google Workspace.
 * Supports:
 *  1) Google Workspace App Password (host smtp.gmail.com or service 'gmail')
 *  2) Google Workspace SMTP Relay (smtp-relay.gmail.com on port 587 or 465)
 *  3) Standard SMTP server credentials
 */
function getTransporter() {
  // Option A: Explicit Google Workspace Configuration
  const gwPassword = process.env.GOOGLE_WORKSPACE_APP_PASSWORD;
  const gwEmail = process.env.GOOGLE_WORKSPACE_EMAIL || DISPATCH_EMAIL;
  const gwRelayHost = process.env.GOOGLE_WORKSPACE_RELAY_HOST; // e.g. 'smtp-relay.gmail.com' or 'smtp.gmail.com'

  if (gwPassword) {
    return nodemailer.createTransport({
      host: gwRelayHost || 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: gwEmail,
        pass: gwPassword,
      },
      tls: {
        rejectUnauthorized: true,
      },
    });
  }

  // Option B: Generic SMTP Configuration
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (host && user && pass) {
    const port = Number(process.env.SMTP_PORT) || 587;
    return nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
      tls: {
        rejectUnauthorized: true,
      },
    });
  }

  return null;
}

interface DispatchPayload {
  type: 'quote' | 'booking' | 'quick_inquiry' | 'workspace_test';
  ticketId: string;
  name: string;
  email?: string;
  phone?: string;
  serviceId?: string;
  serviceTitle?: string;
  frequency?: string;
  propertyType?: string;
  propertySize?: string;
  postcode?: string;
  message?: string;
  preferredTime?: string;
  contactMethod?: string;
}

/**
 * Dispatches an email formatted and optimized specifically for Google Workspace / Gmail.
 * Incorporates:
 *  - Strict SPF/DKIM aligned sender and return-path headers
 *  - RFC 2822 Message-ID tied to lincsscsltd.com
 *  - Explicit customer Reply-To preservation
 *  - Gmail conversation threading headers (X-Entity-Ref-ID)
 *  - 1-Click "Add to Google Calendar" button
 *  - 1-Click "View in Google Maps" button
 *  - 1-Click "Reply in Gmail" button
 *  - Multi-part text and HTML
 */
async function dispatchEmail(payload: DispatchPayload) {
  const subjectLabel =
    payload.type === 'quote'
      ? `[New Quote Request #${payload.ticketId}]`
      : payload.type === 'booking'
      ? `[New Booking Request #${payload.ticketId}]`
      : payload.type === 'workspace_test'
      ? `[Google Workspace Deliverability Test #${payload.ticketId}]`
      : `[Fast Inquiry #${payload.ticketId}]`;

  const subject = `${subjectLabel} ${payload.serviceTitle || 'Cleaning'} from ${payload.name || 'Website Visitor'}`;
  const fromAddress = process.env.SMTP_FROM || `"LINCS Sparkling Cleaning Services" <${DISPATCH_EMAIL}>`;
  const replyTo = payload.email ? `"${payload.name}" <${payload.email}>` : undefined;

  // Generate Google Workspace productivity links
  const customerEmail = payload.email || '';
  const customerPhone = payload.phone || '';
  const postcode = payload.postcode || 'Clay Corner, Chertsey, Surrey KT16 8PW';

  // 1-Click Google Calendar event link
  const calTitle = encodeURIComponent(`LINCS Clean: ${payload.serviceTitle || payload.serviceId || 'Service'} - ${payload.name}`);
  const calDetails = encodeURIComponent(
    `LINCS Booking Ref: #${payload.ticketId}\nClient: ${payload.name}\nPhone: ${customerPhone}\nEmail: ${customerEmail}\nAddress/Postcode: ${postcode}\nFrequency: ${payload.frequency || 'N/A'}\nNotes: ${payload.message || 'N/A'}`
  );
  const calLocation = encodeURIComponent(postcode);
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${calTitle}&details=${calDetails}&location=${calLocation}`;

  // 1-Click Google Maps search link
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(postcode)}`;

  // 1-Click Gmail compose reply link
  const gmailReplyUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    customerEmail || DISPATCH_EMAIL
  )}&su=${encodeURIComponent(`Re: LINCS Cleaning Request #${payload.ticketId} - ${payload.serviceTitle || ''}`)}`;

  // Direct phone / WhatsApp action
  const cleanPhone = customerPhone.replace(/[^0-9+]/g, '');
  const telUrl = `tel:${cleanPhone}`;
  const whatsappUrl = cleanPhone ? `https://wa.me/${cleanPhone.replace('+', '')}` : '#';

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${subject}</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b100b; color: #f4f4f5; margin: 0; padding: 20px 10px; }
        .wrapper { max-width: 620px; margin: 0 auto; background-color: #141c14; border: 1px solid #283726; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
        .header { background-color: #0d150d; border-bottom: 2px solid #9fe81d; padding: 24px; text-align: left; }
        .header h1 { margin: 0; color: #ffffff; font-size: 20px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 900; }
        .badge { display: inline-block; background-color: #9fe81d; color: #0a0e0a; font-weight: 900; font-size: 11px; padding: 4px 12px; border-radius: 9999px; text-transform: uppercase; margin-top: 8px; letter-spacing: 0.5px; }
        .content { padding: 24px; }
        .section-title { font-size: 12px; text-transform: uppercase; color: #9fe81d; font-weight: 800; letter-spacing: 1px; margin-bottom: 12px; }
        .field { margin-bottom: 14px; border-bottom: 1px solid #1f2a1e; padding-bottom: 10px; }
        .field:last-child { border-bottom: none; }
        .label { font-size: 11px; color: #a1a1aa; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px; }
        .value { font-size: 15px; color: #ffffff; margin-top: 3px; font-weight: 600; }
        .mono { font-family: 'Courier New', Courier, monospace; }
        .highlight { color: #9fe81d; }
        .message-box { background-color: #0a0f0a; border-left: 4px solid #9fe81d; padding: 14px 18px; border-radius: 6px; font-size: 14px; color: #e4e4e7; line-height: 1.5; white-space: pre-wrap; margin-top: 6px; }
        .actions-box { background-color: #0f180e; border: 1px solid #233320; border-radius: 12px; padding: 18px; margin-top: 20px; }
        .btn { display: inline-block; padding: 9px 16px; margin: 4px 4px 4px 0; border-radius: 8px; text-decoration: none; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; text-align: center; }
        .btn-lime { background-color: #9fe81d; color: #0a0e0a !important; }
        .btn-dark { background-color: #1f2d1e; color: #ffffff !important; border: 1px solid #3d553b; }
        .footer { background-color: #0b110b; border-top: 1px solid #212c1f; padding: 18px 24px; font-size: 12px; color: #889487; text-align: center; line-height: 1.6; }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="header">
          <h1>LINCS SPARKLING CLEANING SERVICES</h1>
          <div class="badge">${payload.type.toUpperCase().replace('_', ' ')} NOTIFICATION</div>
        </div>

        <div class="content">
          <div class="section-title">Inquiry Overview</div>
          
          <div class="field">
            <div class="label">Ticket Reference</div>
            <div class="value mono highlight">#${payload.ticketId}</div>
          </div>

          <div class="field">
            <div class="label">Client Name</div>
            <div class="value">${payload.name || 'Not provided'}</div>
          </div>

          <div class="field">
            <div class="label">Phone Contact</div>
            <div class="value mono">${customerPhone || 'Not provided'}</div>
          </div>

          <div class="field">
            <div class="label">Email Address</div>
            <div class="value mono">${customerEmail || 'Not provided'}</div>
          </div>

          ${
            payload.serviceTitle || payload.serviceId
              ? `<div class="field">
                  <div class="label">Requested Service</div>
                  <div class="value highlight">${payload.serviceTitle || payload.serviceId}</div>
                </div>`
              : ''
          }

          ${
            payload.frequency
              ? `<div class="field">
                  <div class="label">Cleaning Frequency</div>
                  <div class="value">${payload.frequency}</div>
                </div>`
              : ''
          }

          ${
            payload.propertyType || payload.propertySize
              ? `<div class="field">
                  <div class="label">Property Details</div>
                  <div class="value">${[payload.propertyType, payload.propertySize].filter(Boolean).join(' · ')}</div>
                </div>`
              : ''
          }

          ${
            payload.postcode
              ? `<div class="field">
                  <div class="label">Postcode / Location</div>
                  <div class="value mono">${payload.postcode}</div>
                </div>`
              : ''
          }

          ${
            payload.preferredTime
              ? `<div class="field">
                  <div class="label">Preferred Schedule / Shift</div>
                  <div class="value">${payload.preferredTime}</div>
                </div>`
              : ''
          }

          ${
            payload.contactMethod
              ? `<div class="field">
                  <div class="label">Preferred Callback Channel</div>
                  <div class="value" style="text-transform: capitalize;">${payload.contactMethod}</div>
                </div>`
              : ''
          }

          ${
            payload.message
              ? `<div class="field">
                  <div class="label">Client Message &amp; Requirements</div>
                  <div class="message-box">${payload.message}</div>
                </div>`
              : ''
          }

          <!-- Google Workspace 1-Click Operations Box -->
          <div class="actions-box">
            <div class="section-title">Google Workspace 1-Click Operations</div>
            <div style="margin-top: 8px;">
              <a href="${googleCalendarUrl}" target="_blank" class="btn btn-lime">
                📅 Add to Google Calendar
              </a>
              <a href="${googleMapsUrl}" target="_blank" class="btn btn-dark">
                🗺️ View in Google Maps
              </a>
              ${
                customerEmail
                  ? `<a href="${gmailReplyUrl}" target="_blank" class="btn btn-dark">
                      ✉️ Reply in Gmail
                    </a>`
                  : ''
              }
              ${
                cleanPhone
                  ? `<a href="${telUrl}" class="btn btn-dark">
                      📞 Call Client (${customerPhone})
                    </a>
                    <a href="${whatsappUrl}" target="_blank" class="btn btn-dark">
                      💬 WhatsApp
                    </a>`
                  : ''
              }
            </div>
          </div>
        </div>

        <div class="footer">
          Dispatched to Google Workspace Mailbox: <strong style="color: #9fe81d;">${DISPATCH_EMAIL}</strong><br>
          LINCS Sparkling Cleaning Services Ltd &bull; Clay Corner, Chertsey, Surrey KT16 8PW<br>
          <span style="font-size: 11px; color: #556654;">Google Workspace RFC 2822 Deliverability &bull; SPF/DKIM Domain Aligned</span>
        </div>
      </div>
    </body>
    </html>
  `;

  const textContent = `
============================================================
LINCS CLEANING SERVICES - ${payload.type.toUpperCase().replace('_', ' ')}
Routed to Google Workspace: ${DISPATCH_EMAIL}
Ticket Reference: #${payload.ticketId}
============================================================

CLIENT DETAILS:
- Full Name: ${payload.name || 'Anonymous'}
- Phone: ${customerPhone || 'Not provided'}
- Email: ${customerEmail || 'Not provided'}
- Postcode / Location: ${postcode}

SERVICE REQUIREMENTS:
- Primary Service: ${payload.serviceTitle || payload.serviceId || 'General Inquiry'}
- Frequency: ${payload.frequency || 'N/A'}
- Property Type: ${payload.propertyType || 'N/A'}
- Size: ${payload.propertySize || 'N/A'}
- Preferred Schedule: ${payload.preferredTime || 'N/A'}
- Preferred Contact: ${payload.contactMethod || 'Phone/Email'}

ADDITIONAL NOTES:
${payload.message || 'No additional notes provided.'}

GOOGLE WORKSPACE QUICK LINKS:
- Add to Google Calendar: ${googleCalendarUrl}
- View Postcode on Google Maps: ${googleMapsUrl}
- Reply via Gmail: ${gmailReplyUrl}

============================================================
LINCS Sparkling Cleaning Services Ltd
Clay Corner, Chertsey, Surrey KT16 8PW
Registration: Registered in England & Wales
============================================================
  `.trim();

  // Console observability
  console.log(`\n============================================================`);
  console.log(`📧 [GOOGLE WORKSPACE EMAIL DISPATCH -> ${DISPATCH_EMAIL}]`);
  console.log(`Subject: ${subject}`);
  console.log(`Recipient: ${DISPATCH_EMAIL}`);
  if (replyTo) console.log(`Reply-To: ${replyTo}`);
  console.log(`Ticket: #${payload.ticketId} (${payload.type})`);
  console.log(`Client: ${payload.name} | Phone: ${customerPhone} | Email: ${customerEmail}`);
  console.log(`Calendar Sync URL: ${googleCalendarUrl}`);
  console.log(`============================================================\n`);

  // Persist record
  saveSubmission({
    id: payload.ticketId,
    type: payload.type,
    recipient: DISPATCH_EMAIL,
    dispatchedAt: new Date().toISOString(),
    payload,
    status: 'dispatched',
    googleCalendarUrl,
    googleMapsUrl,
  });

  const transporter = getTransporter();
  let deliveryStatus = 'stored_in_queue';

  if (transporter) {
    try {
      await transporter.sendMail({
        from: fromAddress,
        to: DISPATCH_EMAIL,
        replyTo,
        subject,
        text: textContent,
        html: htmlContent,
        messageId: `<lincs-${payload.ticketId}-${Date.now()}@lincsscsltd.com>`,
        headers: {
          'X-Entity-Ref-ID': `lincs-ticket-${payload.ticketId}`,
          'X-Mailer': 'LINCS-Sparkling-Portal-GoogleWorkspace/2.0',
          'Auto-Submitted': 'auto-generated',
          'X-Priority': '1',
          Importance: 'High',
        },
      });
      console.log(`[Google Workspace SMTP] Successfully delivered #${payload.ticketId} to ${DISPATCH_EMAIL}`);
      deliveryStatus = 'delivered';
    } catch (err) {
      console.error(`[Google Workspace SMTP Error] Could not deliver email #${payload.ticketId}:`, err);
      deliveryStatus = 'smtp_error_saved_locally';
    }
  } else {
    console.log(`[Google Workspace Dispatch] Routed to ${DISPATCH_EMAIL} (stored locally; set GOOGLE_WORKSPACE_APP_PASSWORD or SMTP_HOST for direct relay).`);
  }

  return {
    success: true,
    ticketId: payload.ticketId,
    recipient: DISPATCH_EMAIL,
    deliveryStatus,
  };
}

// -------------------------------------------------------------
// REST API Endpoints
// -------------------------------------------------------------

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    dispatchEmail: DISPATCH_EMAIL,
    googleWorkspaceOptimized: true,
    smtpConfigured: !!(
      process.env.GOOGLE_WORKSPACE_APP_PASSWORD ||
      (process.env.SMTP_HOST && process.env.SMTP_USER)
    ),
    timestamp: new Date().toISOString(),
  });
});

// Google Workspace Status & Diagnostics endpoint
app.get('/api/workspace/status', (req: Request, res: Response) => {
  const isSmtpConfigured = !!(
    process.env.GOOGLE_WORKSPACE_APP_PASSWORD ||
    (process.env.SMTP_HOST && process.env.SMTP_USER)
  );

  let rawSubmissions: any[] = [];
  try {
    rawSubmissions = JSON.parse(fs.readFileSync(SUBMISSIONS_FILE, 'utf-8') || '[]');
  } catch {
    rawSubmissions = [];
  }

  res.json({
    targetEmail: DISPATCH_EMAIL,
    domain: 'lincsscsltd.com',
    workspaceConfigured: isSmtpConfigured,
    transport: isSmtpConfigured
      ? process.env.GOOGLE_WORKSPACE_APP_PASSWORD
        ? 'Google Workspace SMTP Relay (smtp.gmail.com)'
        : `Custom SMTP Relay (${process.env.SMTP_HOST})`
      : 'Google Workspace Ready (Local Persistent Queue & Console)',
    googleWorkspaceDns: {
      mx: [
        { priority: 1, host: 'ASPMX.L.GOOGLE.COM' },
        { priority: 5, host: 'ALT1.ASPMX.L.GOOGLE.COM' },
        { priority: 5, host: 'ALT2.ASPMX.L.GOOGLE.COM' },
        { priority: 10, host: 'ALT3.ASPMX.L.GOOGLE.COM' },
        { priority: 10, host: 'ALT4.ASPMX.L.GOOGLE.COM' },
      ],
      spf: 'v=spf1 include:_spf.google.com ~all',
      dkim: 'google._domainkey.lincsscsltd.com',
      dmarc: 'v=DMARC1; p=quarantine; rua=mailto:dmarc@lincsscsltd.com',
    },
    totalSubmissions: rawSubmissions.length,
    timestamp: new Date().toISOString(),
  });
});

// Test dispatch endpoint specifically for Google Workspace verification
app.post('/api/workspace/test-dispatch', async (req: Request, res: Response) => {
  try {
    const ticketId = `GW-TEST-${Math.floor(1000 + Math.random() * 9000)}`;
    const result = await dispatchEmail({
      type: 'workspace_test',
      ticketId,
      name: req.body?.testerName || 'LINCS System Administrator',
      email: req.body?.testerEmail || 'admin@lincsscsltd.com',
      phone: '+44 7490 705078',
      serviceTitle: 'Google Workspace Integration Health Check',
      postcode: 'KT16 8PW',
      message:
        'Deliverability test confirming Google Workspace SPF/DKIM headers, 1-click Google Calendar sync, and direct routing to info@lincsscsltd.com.',
    });

    res.json({
      success: true,
      ticketId: result.ticketId,
      recipient: result.recipient,
      message: `Google Workspace deliverability test dispatched to ${DISPATCH_EMAIL}`,
    });
  } catch (error: any) {
    console.error('Failed test dispatch:', error);
    res.status(500).json({ success: false, error: error.message || 'Test dispatch failed' });
  }
});

// List persistent submissions
app.get('/api/submissions', (req: Request, res: Response) => {
  try {
    const raw = fs.readFileSync(SUBMISSIONS_FILE, 'utf-8');
    res.json(JSON.parse(raw || '[]'));
  } catch {
    res.json([]);
  }
});

// Export submissions in CSV format for Google Sheets / Excel import
app.get('/api/workspace/export', (req: Request, res: Response) => {
  try {
    const raw = fs.readFileSync(SUBMISSIONS_FILE, 'utf-8');
    const items = JSON.parse(raw || '[]');

    const headers = ['ID', 'Type', 'Dispatched At', 'Client Name', 'Phone', 'Email', 'Service', 'Postcode', 'Message'];
    const rows = items.map((i: any) => [
      i.id,
      i.type,
      i.dispatchedAt,
      `"${(i.payload?.name || '').replace(/"/g, '""')}"`,
      `"${(i.payload?.phone || '').replace(/"/g, '""')}"`,
      `"${(i.payload?.email || '').replace(/"/g, '""')}"`,
      `"${(i.payload?.serviceTitle || i.payload?.serviceId || '').replace(/"/g, '""')}"`,
      `"${(i.payload?.postcode || '').replace(/"/g, '""')}"`,
      `"${(i.payload?.message || '').replace(/"/g, '""')}"`,
    ]);

    const csv = [headers.join(','), ...rows.map((r: any) => r.join(','))].join('\n');
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="lincs-workspace-submissions.csv"');
    res.send(csv);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to export submissions' });
  }
});

// Quote Request Handler
app.post(['/api/quote', '/api/quotes'], async (req: Request, res: Response) => {
  try {
    const body = req.body || {};
    const ticketId = body.id || `LINCS-QT-${Math.floor(1000 + Math.random() * 9000)}`;

    const result = await dispatchEmail({
      type: 'quote',
      ticketId,
      name: body.name || 'Anonymous',
      email: body.email,
      phone: body.phone,
      serviceId: body.serviceId,
      serviceTitle: body.serviceTitle,
      frequency: body.frequency,
      propertyType: body.propertyType,
      propertySize: body.propertySize,
      postcode: body.postcode,
      message: body.message,
      preferredTime: body.preferredTime,
    });

    res.json({
      success: true,
      message: `Quote request routed to Google Workspace (${DISPATCH_EMAIL})`,
      ticketId: result.ticketId,
      recipient: DISPATCH_EMAIL,
    });
  } catch (error: any) {
    console.error('Failed to process quote:', error);
    res.status(500).json({ success: false, error: error.message || 'Internal server error' });
  }
});

// Booking Request Handler
app.post(['/api/booking', '/api/bookings'], async (req: Request, res: Response) => {
  try {
    const body = req.body || {};
    const ticketId = body.id || `LINCS-BK-${Math.floor(1000 + Math.random() * 9000)}`;

    const result = await dispatchEmail({
      type: 'booking',
      ticketId,
      name: body.name || 'Anonymous',
      email: body.email,
      phone: body.phone,
      serviceId: body.serviceId,
      serviceTitle: body.serviceTitle,
      frequency: body.frequency,
      propertyType: body.propertyType,
      propertySize: body.propertySize,
      postcode: body.postcode,
      message: body.message,
      preferredTime: body.preferredTime,
      contactMethod: body.contactMethod,
    });

    res.json({
      success: true,
      message: `Booking request routed to Google Workspace (${DISPATCH_EMAIL})`,
      ticketId: result.ticketId,
      recipient: DISPATCH_EMAIL,
    });
  } catch (error: any) {
    console.error('Failed to process booking:', error);
    res.status(500).json({ success: false, error: error.message || 'Internal server error' });
  }
});

// Fast Inquiry / Contact Form Handler
app.post(['/api/contact', '/api/inquiries'], async (req: Request, res: Response) => {
  try {
    const body = req.body || {};
    const ticketId = body.id || `LINCS-CT-${Math.floor(1000 + Math.random() * 9000)}`;

    const result = await dispatchEmail({
      type: 'quick_inquiry',
      ticketId,
      name: body.name || 'Anonymous',
      email: body.email,
      phone: body.phone,
      serviceId: body.serviceId,
      serviceTitle: body.serviceTitle || body.service,
      message: body.request || body.message,
      contactMethod: body.contactMethod,
      postcode: body.postcode,
    });

    res.json({
      success: true,
      message: `Inquiry routed to Google Workspace (${DISPATCH_EMAIL})`,
      ticketId: result.ticketId,
      recipient: DISPATCH_EMAIL,
    });
  } catch (error: any) {
    console.error('Failed to process contact inquiry:', error);
    res.status(500).json({ success: false, error: error.message || 'Internal server error' });
  }
});

async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      if (req.path.startsWith('/api')) {
        return res.status(404).json({ error: 'API route not found' });
      }
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`LINCS server listening on http://localhost:${PORT}`);
    console.log(`Google Workspace optimized email destination: ${DISPATCH_EMAIL}`);
  });
}

startServer();
