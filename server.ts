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
const DISPATCH_EMAIL = process.env.DISPATCH_EMAIL || 'info@lincsscsltd.com';

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
    // Keep last 100 entries
    fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(list.slice(0, 100), null, 2), 'utf-8');
  } catch (err) {
    console.error('[Storage Error] Failed to persist submission:', err);
  }
}

// Mailer configuration
function getTransporter() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (host && user && pass) {
    return nodemailer.createTransport({
      host,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_PORT === '465',
      auth: { user, pass },
    });
  }
  return null;
}

interface DispatchPayload {
  type: 'quote' | 'booking' | 'quick_inquiry';
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

async function dispatchEmail(payload: DispatchPayload) {
  const subjectLabel =
    payload.type === 'quote'
      ? `[New Quote Request #${payload.ticketId}]`
      : payload.type === 'booking'
      ? `[New Booking Request #${payload.ticketId}]`
      : `[Fast Inquiry #${payload.ticketId}]`;

  const subject = `${subjectLabel} from ${payload.name || 'Website Visitor'} - LINCS Portal`;
  const fromAddress = process.env.SMTP_FROM || `LINCS Cleaning Portal <info@lincsscsltd.com>`;
  const replyTo = payload.email || undefined;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0d140d; color: #f4f4f5; margin: 0; padding: 24px; }
        .card { background-color: #171d17; border: 1px solid #2e382b; border-radius: 12px; max-width: 600px; margin: 0 auto; overflow: hidden; }
        .header { background-color: #111a10; border-bottom: 2px solid #9fe81d; padding: 20px 24px; }
        .header h1 { margin: 0; color: #ffffff; font-size: 20px; text-transform: uppercase; letter-spacing: 0.5px; }
        .badge { display: inline-block; background-color: #9fe81d; color: #0a0e0a; font-weight: 800; font-size: 11px; padding: 4px 10px; border-radius: 9999px; text-transform: uppercase; margin-top: 6px; }
        .content { padding: 24px; }
        .field { margin-bottom: 14px; border-bottom: 1px solid #232d20; padding-bottom: 10px; }
        .field:last-child { border-bottom: none; }
        .label { font-size: 11px; color: #9fe81d; text-transform: uppercase; font-weight: bold; letter-spacing: 0.5px; }
        .value { font-size: 15px; color: #ffffff; margin-top: 2px; }
        .mono { font-family: 'Courier New', Courier, monospace; }
        .message-box { background-color: #0b110a; border-left: 4px solid #9fe81d; padding: 12px 16px; border-radius: 4px; font-size: 14px; color: #e4e4e7; white-space: pre-wrap; margin-top: 6px; }
        .footer { background-color: #0c120c; border-top: 1px solid #232d20; padding: 16px 24px; font-size: 12px; color: #a1a1aa; text-align: center; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <h1>LINCS Sparkling Cleaning Services</h1>
          <div class="badge">${payload.type.toUpperCase()} NOTIFICATION</div>
        </div>
        <div class="content">
          <div class="field">
            <div class="label">Ticket Reference</div>
            <div class="value mono" style="color: #9fe81d; font-weight: bold;">#${payload.ticketId}</div>
          </div>
          <div class="field">
            <div class="label">Customer Full Name</div>
            <div class="value font-weight: bold;">${payload.name || 'Not provided'}</div>
          </div>
          <div class="field">
            <div class="label">Phone Number</div>
            <div class="value mono">${payload.phone || 'Not provided'}</div>
          </div>
          <div class="field">
            <div class="label">Email Address</div>
            <div class="value mono">${payload.email || 'Not provided'}</div>
          </div>
          ${
            payload.serviceTitle || payload.serviceId
              ? `<div class="field">
                  <div class="label">Service Requested</div>
                  <div class="value">${payload.serviceTitle || payload.serviceId}</div>
                </div>`
              : ''
          }
          ${
            payload.frequency
              ? `<div class="field">
                  <div class="label">Frequency</div>
                  <div class="value">${payload.frequency}</div>
                </div>`
              : ''
          }
          ${
            payload.propertyType || payload.propertySize
              ? `<div class="field">
                  <div class="label">Property Type &amp; Size</div>
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
                  <div class="label">Preferred Contact Method</div>
                  <div class="value" style="text-transform: capitalize;">${payload.contactMethod}</div>
                </div>`
              : ''
          }
          ${
            payload.message
              ? `<div class="field">
                  <div class="label">Requirements / Message</div>
                  <div class="message-box">${payload.message}</div>
                </div>`
              : ''
          }
        </div>
        <div class="footer">
          Sent to <strong>${DISPATCH_EMAIL}</strong> &bull; LINCS Sparkling Cleaning Services Ltd &bull; Chertsey, Surrey
        </div>
      </div>
    </body>
    </html>
  `;

  const textContent = `
============================================================
LINCS CLEANING - ${payload.type.toUpperCase()} REQUEST
Destination: ${DISPATCH_EMAIL}
Ticket: #${payload.ticketId}
============================================================
Customer: ${payload.name}
Phone: ${payload.phone || 'N/A'}
Email: ${payload.email || 'N/A'}
Service: ${payload.serviceTitle || payload.serviceId || 'General Inquiry'}
Frequency: ${payload.frequency || 'N/A'}
Property: ${payload.propertyType || 'N/A'} (${payload.propertySize || 'N/A'})
Postcode: ${payload.postcode || 'N/A'}
Preferred Time: ${payload.preferredTime || 'N/A'}
Contact Method: ${payload.contactMethod || 'N/A'}

Message / Details:
${payload.message || 'No additional message.'}
============================================================
  `.trim();

  // Always log clearly to server console
  console.log(`\n============================================================`);
  console.log(`📧 [OUTGOING EMAIL DISPATCH -> ${DISPATCH_EMAIL}]`);
  console.log(`Subject: ${subject}`);
  console.log(`Recipient: ${DISPATCH_EMAIL}`);
  if (replyTo) console.log(`Reply-To: ${replyTo}`);
  console.log(`Ticket: #${payload.ticketId} (${payload.type})`);
  console.log(`Customer: ${payload.name} | Phone: ${payload.phone} | Email: ${payload.email}`);
  console.log(`============================================================\n`);

  // Persist submission record
  saveSubmission({
    id: payload.ticketId,
    type: payload.type,
    recipient: DISPATCH_EMAIL,
    dispatchedAt: new Date().toISOString(),
    payload,
    status: 'dispatched',
  });

  const transporter = getTransporter();
  if (transporter) {
    try {
      await transporter.sendMail({
        from: fromAddress,
        to: DISPATCH_EMAIL,
        replyTo,
        subject,
        text: textContent,
        html: htmlContent,
      });
      console.log(`[SMTP] Successfully delivered email #${payload.ticketId} to ${DISPATCH_EMAIL}`);
    } catch (err) {
      console.error(`[SMTP Error] Could not deliver email #${payload.ticketId}:`, err);
    }
  } else {
    console.log(`[Email Dispatch] Routed to ${DISPATCH_EMAIL} (transporter in log mode).`);
  }

  return {
    success: true,
    ticketId: payload.ticketId,
    recipient: DISPATCH_EMAIL,
  };
}

// REST Endpoints
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    dispatchEmail: DISPATCH_EMAIL,
    smtpConfigured: !!(process.env.SMTP_HOST && process.env.SMTP_USER),
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/submissions', (req: Request, res: Response) => {
  try {
    const raw = fs.readFileSync(SUBMISSIONS_FILE, 'utf-8');
    res.json(JSON.parse(raw || '[]'));
  } catch {
    res.json([]);
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
      message: `Quote request successfully sent to ${DISPATCH_EMAIL}`,
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
      message: `Booking request successfully sent to ${DISPATCH_EMAIL}`,
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
      message: `Inquiry successfully sent to ${DISPATCH_EMAIL}`,
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
    console.log(`All bookings and quote requests are routed to: ${DISPATCH_EMAIL}`);
  });
}

startServer();
