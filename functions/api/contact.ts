/**
 * Cloudflare Pages Function: POST /api/contact
 *
 * Dispatches contact inquiries & quick queries to LINCS Operations via the
 * Cloudflare Email Sending REST API.
 *
 * Environment variables configured in Cloudflare Pages:
 * - CF_EMAIL_ACCOUNT_ID: Cloudflare Account ID (with Email Sending enabled)
 * - CF_EMAIL_API_TOKEN: Cloudflare API Token with Email Sending Edit permission (Secret)
 * - DISPATCH_EMAIL: Target recipient (defaults to info@lincsscsltd.com)
 * - EMAIL_FROM: Verified sending address (defaults to website@lincsscsltd.com)
 */

interface Env {
  CF_EMAIL_ACCOUNT_ID?: string;
  CF_EMAIL_API_TOKEN?: string;
  DISPATCH_EMAIL?: string;
  EMAIL_FROM?: string;
}

interface EventContext<E> {
  request: Request;
  env: E;
  params: Record<string, string | string[]>;
  waitUntil: (promise: Promise<unknown>) => void;
  next: () => Promise<Response>;
  data: Record<string, unknown>;
}

const DEFAULT_DISPATCH_EMAIL = 'info@lincsscsltd.com';
const DEFAULT_EMAIL_FROM = 'website@lincsscsltd.com';
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
  });
}

export const onRequestPost = async (context: EventContext<Env>): Promise<Response> => {
  const { request, env } = context;

  // 1. Read & sanitize server-side configuration
  const accountId = env.CF_EMAIL_ACCOUNT_ID?.trim();
  const apiToken = env.CF_EMAIL_API_TOKEN?.trim();
  const dispatchEmail = env.DISPATCH_EMAIL?.trim() || DEFAULT_DISPATCH_EMAIL;
  const emailFrom = env.EMAIL_FROM?.trim() || DEFAULT_EMAIL_FROM;

  // 2. Parse and validate JSON request body
  let body: any;
  try {
    body = await request.json();
  } catch {
    return jsonResponse(
      {
        success: false,
        error: 'Invalid request payload. Please submit valid JSON.',
      },
      400
    );
  }

  if (!body || typeof body !== 'object') {
    return jsonResponse(
      {
        success: false,
        error: 'Invalid request body format.',
      },
      400
    );
  }

  // 3. Field validation
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  if (!name) {
    return jsonResponse(
      {
        success: false,
        error: 'Name is required. Please provide your name.',
      },
      400
    );
  }
  if (name.length > 100) {
    return jsonResponse(
      {
        success: false,
        error: 'Name is too long (maximum 100 characters).',
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
        error: 'Phone number is too long (maximum 50 characters).',
      },
      400
    );
  }

  const rawMessage = body.request || body.message || body.query || '';
  const message = typeof rawMessage === 'string' ? rawMessage.trim() : '';
  if (message.length > 2000) {
    return jsonResponse(
      {
        success: false,
        error: 'Message is too long (maximum 2,000 characters).',
      },
      400
    );
  }

  const service = typeof (body.serviceTitle || body.serviceId || body.service) === 'string'
    ? (body.serviceTitle || body.serviceId || body.service).trim().slice(0, 100)
    : '';

  const postcode = typeof body.postcode === 'string' ? body.postcode.trim().slice(0, 20) : '';

  // Generate or sanitize ticket ID
  const rawId = typeof body.id === 'string' ? body.id.trim() : '';
  const ticketId = rawId && rawId.length <= 40 ? rawId : `LINCS-CT-${Math.floor(1000 + Math.random() * 9000)}`;

  // 4. Ensure Cloudflare Email Sending credentials are provided
  if (!accountId || !apiToken) {
    console.error(
      '[Cloudflare Pages Function] Missing CF_EMAIL_ACCOUNT_ID or CF_EMAIL_API_TOKEN environment variables.'
    );
    return jsonResponse(
      {
        success: false,
        error: `Email service is temporarily unavailable on the server. Please email our office directly at ${dispatchEmail}.`,
      },
      503
    );
  }

  // 5. Construct Plain-Text Email
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

  if (service) {
    plainTextLines.push(`Service:       ${service}`);
  }
  if (postcode) {
    plainTextLines.push(`Postcode:      ${postcode}`);
  }

  plainTextLines.push('');
  plainTextLines.push('Message / Request Details:');
  plainTextLines.push('------------------------------------------------------------');
  plainTextLines.push(message || 'No additional message provided.');
  plainTextLines.push('------------------------------------------------------------');
  plainTextLines.push('');
  plainTextLines.push(`Routed To: ${dispatchEmail}`);
  plainTextLines.push(`Reply-To:  ${email}`);

  const plainTextMessage = plainTextLines.join('\n');

  // 6. Call Cloudflare Email Sending REST API
  // Endpoint: POST https://api.cloudflare.com/client/v4/accounts/{account_id}/email/sending/send
  const cfUrl = `https://api.cloudflare.com/client/v4/accounts/${encodeURIComponent(accountId)}/email/sending/send`;

  const cfPayload = {
    personalizations: [
      {
        to: [
          {
            email: dispatchEmail,
            name: 'LINCS Operations',
          },
        ],
      },
    ],
    from: {
      address: emailFrom,
      name: 'LINCS Cleaning Website',
    },
    reply_to: {
      address: email,
      name: name,
    },
    subject: `[Quick Query #${ticketId}] from ${name} - LINCS Portal`,
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
          error: `We were unable to deliver your message through the automated mailer (${errorMsg}). Please retry or email ${dispatchEmail} directly.`,
        },
        502
      );
    }

    // 7. Successful delivery
    return jsonResponse(
      {
        success: true,
        message: `Inquiry successfully delivered to ${dispatchEmail}`,
        ticketId,
        recipient: dispatchEmail,
      },
      200
    );
  } catch (error: any) {
    console.error('[Cloudflare Function Network Error]', error);
    return jsonResponse(
      {
        success: false,
        error: `Network error connecting to email service. Please email ${dispatchEmail} directly.`,
      },
      502
    );
  }
};

export const onRequestOptions = async (): Promise<Response> => {
  return new Response(null, {
    status: 204,
    headers: {
      Allow: 'POST, OPTIONS',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};
