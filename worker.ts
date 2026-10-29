/**
 * Cloudflare Worker Entry Point: worker.ts
 *
 * Full-stack Cloudflare Worker handling API routes and serving built static assets (Vite in ./dist).
 *
 * Implements:
 * - POST /api/contact: Validates form input and delivers inquiries to info@lincsscsltd.com
 *   using Cloudflare Email Sending REST API.
 * - Non-POST /api/contact: Returns HTTP 405 Method Not Allowed with JSON.
 * - GET /api/health: Health check endpoint reporting Worker status and configuration.
 * - All other routes: Passes through to env.ASSETS.fetch() for static assets and SPA routing.
 */

export interface Env {
  ASSETS: {
    fetch: (request: Request | string) => Promise<Response>;
  };
  CF_EMAIL_ACCOUNT_ID?: string;
  CF_EMAIL_API_TOKEN?: string;
  DISPATCH_EMAIL?: string;
  EMAIL_FROM?: string;
}

const DEFAULT_DISPATCH_EMAIL = 'info@lincsscsltd.com';
const DEFAULT_EMAIL_FROM = 'website@lincsscsltd.com';
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function jsonResponse(data: unknown, status = 200, headers: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
      ...headers,
    },
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // 1. Health check endpoint
    if (url.pathname === '/api/health') {
      return jsonResponse({
        status: 'ok',
        runtime: 'cloudflare-worker',
        dispatchEmail: env.DISPATCH_EMAIL?.trim() || DEFAULT_DISPATCH_EMAIL,
        cfEmailConfigured: !!(env.CF_EMAIL_ACCOUNT_ID?.trim() && env.CF_EMAIL_API_TOKEN?.trim()),
        timestamp: new Date().toISOString(),
      });
    }

    // 2. Contact & Quick Request API routes
    if (
      url.pathname === '/api/contact' ||
      url.pathname === '/api/inquiries' ||
      url.pathname === '/api/inquiry' ||
      url.pathname === '/api/request' ||
      url.pathname === '/api/requests' ||
      url.pathname === '/api/query' ||
      url.pathname === '/api/queries' ||
      url.pathname === '/api/quote' ||
      url.pathname === '/api/quotes' ||
      url.pathname === '/api/booking' ||
      url.pathname === '/api/bookings'
    ) {
      // CORS Preflight
      if (request.method === 'OPTIONS') {
        return new Response(null, {
          status: 204,
          headers: {
            Allow: 'POST, OPTIONS',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
          },
        });
      }

      // Check method: must be POST
      if (request.method !== 'POST') {
        return jsonResponse(
          {
            success: false,
            error: `Method ${request.method} Not Allowed. Use POST.`,
          },
          405,
          {
            Allow: 'POST, OPTIONS',
          }
        );
      }

      // Handle POST inquiry
      return handleContactSubmission(request, env, url.pathname);
    }

    // 3. Fallback: serve built Vite assets & SPA single-page routing
    if (env.ASSETS && typeof env.ASSETS.fetch === 'function') {
      return env.ASSETS.fetch(request);
    }

    return new Response('Not found', { status: 404 });
  },
};

async function handleContactSubmission(request: Request, env: Env, pathname: string): Promise<Response> {
  // Read and trim server-side environment variables
  const accountId = env.CF_EMAIL_ACCOUNT_ID?.trim();
  const apiToken = env.CF_EMAIL_API_TOKEN?.trim();
  const dispatchEmail = env.DISPATCH_EMAIL?.trim() || DEFAULT_DISPATCH_EMAIL;
  const emailFrom = env.EMAIL_FROM?.trim() || DEFAULT_EMAIL_FROM;

  // 1. Parse JSON body
  let body: any;
  try {
    body = await request.json();
  } catch {
    return jsonResponse(
      {
        success: false,
        error: 'Invalid JSON request payload.',
      },
      400
    );
  }

  if (!body || typeof body !== 'object') {
    return jsonResponse(
      {
        success: false,
        error: 'Request body must be a valid JSON object.',
      },
      400
    );
  }

  // 2. Validate form fields
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  if (!name) {
    return jsonResponse(
      {
        success: false,
        error: 'Name is required.',
      },
      400
    );
  }
  if (name.length > 100) {
    return jsonResponse(
      {
        success: false,
        error: 'Name must be 100 characters or fewer.',
      },
      400
    );
  }

  const email = typeof body.email === 'string' ? body.email.trim() : '';
  if (!email) {
    return jsonResponse(
      {
        success: false,
        error: 'Email address is required.',
      },
      400
    );
  }
  if (email.length > 254 || !EMAIL_REGEX.test(email)) {
    return jsonResponse(
      {
        success: false,
        error: 'Please provide a valid email address (e.g. name@example.com).',
      },
      400
    );
  }

  const phone = typeof body.phone === 'string' ? body.phone.trim() : '';
  if (phone.length > 50) {
    return jsonResponse(
      {
        success: false,
        error: 'Phone number must be 50 characters or fewer.',
      },
      400
    );
  }

  const rawMessage = body.request || body.message || body.query || body.notes || '';
  const message = typeof rawMessage === 'string' ? rawMessage.trim() : '';
  if (message.length > 2000) {
    return jsonResponse(
      {
        success: false,
        error: 'Message must be 2,000 characters or fewer.',
      },
      400
    );
  }

  const service = typeof (body.serviceTitle || body.serviceId || body.service) === 'string'
    ? (body.serviceTitle || body.serviceId || body.service).trim().slice(0, 100)
    : '';

  const postcode = typeof body.postcode === 'string' ? body.postcode.trim().slice(0, 20) : '';
  const propertyType = typeof body.propertyType === 'string' ? body.propertyType.trim().slice(0, 50) : '';
  const propertySize = typeof body.propertySize === 'string' ? body.propertySize.trim().slice(0, 50) : '';
  const frequency = typeof body.frequency === 'string' ? body.frequency.trim().slice(0, 50) : '';
  const preferredTime = typeof body.preferredTime === 'string' ? body.preferredTime.trim().slice(0, 50) : '';
  const contactMethod = typeof body.contactMethod === 'string' ? body.contactMethod.trim().slice(0, 30) : '';

  // Ticket reference
  const prefix = pathname.includes('quote') ? 'LINCS-QT' : pathname.includes('booking') ? 'LINCS-BK' : 'LINCS-CT';
  const rawId = typeof body.id === 'string' ? body.id.trim() : '';
  const ticketId = rawId && rawId.length <= 40 ? rawId : `${prefix}-${Math.floor(1000 + Math.random() * 9000)}`;

  // 3. Ensure Cloudflare Email Sending credentials exist
  if (!accountId || !apiToken) {
    console.error('[Cloudflare Worker] Missing CF_EMAIL_ACCOUNT_ID or CF_EMAIL_API_TOKEN environment variables.');
    return jsonResponse(
      {
        success: false,
        error: `Cloudflare Email Sending is not configured on the Worker (missing CF_EMAIL_ACCOUNT_ID or CF_EMAIL_API_TOKEN). Please add secrets in Cloudflare Dashboard or email ${dispatchEmail} directly.`,
      },
      503
    );
  }

  // 4. Construct plain-text email message
  const timestamp = new Date().toISOString();
  const plainTextLines = [
    '============================================================',
    'LINCS SPARKLING CLEANING SERVICES - WEBSITE INQUIRY',
    `Ticket ID: #${ticketId}`,
    `Submitted: ${timestamp}`,
    '============================================================',
    '',
    `Customer Name: ${name}`,
    `Email:         ${email}`,
    `Phone:         ${phone || 'Not provided'}`,
  ];

  if (service) plainTextLines.push(`Service:       ${service}`);
  if (frequency) plainTextLines.push(`Frequency:     ${frequency}`);
  if (propertyType || propertySize) plainTextLines.push(`Property:      ${[propertyType, propertySize].filter(Boolean).join(' · ')}`);
  if (postcode) plainTextLines.push(`Postcode:      ${postcode}`);
  if (preferredTime) plainTextLines.push(`Preferred Time:${preferredTime}`);
  if (contactMethod) plainTextLines.push(`Contact Via:   ${contactMethod}`);

  plainTextLines.push('');
  plainTextLines.push('Message / Request Details:');
  plainTextLines.push('------------------------------------------------------------');
  plainTextLines.push(message || 'No additional message provided.');
  plainTextLines.push('------------------------------------------------------------');
  plainTextLines.push('');
  plainTextLines.push(`Routed To: ${dispatchEmail}`);
  plainTextLines.push(`Reply-To:  ${email}`);

  const plainTextMessage = plainTextLines.join('\n');

  // 5. Call Cloudflare Email Sending REST API
  const cfUrl = `https://api.cloudflare.com/client/v4/accounts/${encodeURIComponent(accountId)}/email/sending/send`;

  const cfPayload = {
    from: emailFrom,
    to: [dispatchEmail],
    reply_to: email,
    subject: `[${prefix} #${ticketId}] from ${name} - LINCS Portal`,
    text: plainTextMessage,
  };

  try {
    const cfResponse = await fetch(cfUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cfPayload),
    });

    const cfData = (await cfResponse.json().catch(() => null)) as any;

    if (!cfResponse.ok || !cfData?.success) {
      const errorMsg =
        cfData?.errors?.map((e: any) => e.message).join(', ') ||
        `Cloudflare Email Sending returned HTTP ${cfResponse.status}`;
      console.error('[Cloudflare Email Sending Error]', errorMsg);

      return jsonResponse(
        {
          success: false,
          error: `Cloudflare Email Sending error: ${errorMsg}. Please retry or email ${dispatchEmail} directly.`,
        },
        502
      );
    }

    // 6. Return success only when Cloudflare confirms acceptance
    return jsonResponse(
      {
        success: true,
        message: `Inquiry successfully routed to ${dispatchEmail}`,
        ticketId,
        recipient: dispatchEmail,
      },
      200
    );
  } catch (error: any) {
    console.error('[Cloudflare Worker Fetch Error]', error);
    return jsonResponse(
      {
        success: false,
        error: `Network error connecting to email service: ${error?.message || 'Unknown error'}. Please email ${dispatchEmail} directly.`,
      },
      502
    );
  }
}
