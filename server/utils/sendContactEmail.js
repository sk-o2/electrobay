// utils/sendContactEmail.js
// CommonJS module. Call sendContactEmail(payload) to send contact form data via nodemailer.
// Exports a single async function that returns an object { ok: true, info } on success
// or throws an Error on failure.

require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587', 10),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  // optional TLS settings:
  // tls: { rejectUnauthorized: false },
});

/**
 * escapeHtml - minimal escape to safely include user input in HTML email
 */
function escapeHtml(str) {
  if (!str && str !== 0) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * buildEmailBody - returns { text, html } for the given payload
 * payload: { name, email, whatsapp, address, project, submittedAt? }
 */
function buildEmailBody(payload = {}) {
  const { name, email, whatsapp, address, project, submittedAt } = payload;
  const submitted = submittedAt || new Date().toISOString();

  const html = `
    <div style="font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;">
      <h2>New project inquiry — ElectroBay</h2>
      <table cellpadding="6" style="border-collapse: collapse;">
        <tr><td style="font-weight:600;">Name</td><td>${escapeHtml(name)}</td></tr>
        <tr><td style="font-weight:600;">Email</td><td>${escapeHtml(email)}</td></tr>
        <tr><td style="font-weight:600;">WhatsApp</td><td>${escapeHtml(whatsapp)}</td></tr>
        <tr><td style="font-weight:600;">Address</td><td>${escapeHtml(address)}</td></tr>
        <tr><td style="font-weight:600;">Project details</td><td>${escapeHtml(project).replace(/\n/g, '<br/>')}</td></tr>
        <tr><td style="font-weight:600;">Received at</td><td>${escapeHtml(submitted)}</td></tr>
      </table>
    </div>
  `;

  const text = `
New project inquiry — ElectroBay

Name: ${name || ''}
Email: ${email || ''}
WhatsApp: ${whatsapp || ''}
Address: ${address || ''}
Project details:
${project || ''}

Received at: ${submitted}
  `.trim();

  return { html, text };
}

/**
 * sendContactEmail(payload)
 * payload must contain: name, email, whatsapp, project (address optional)
 */
async function sendContactEmail(payload = {}) {
  // basic validation
  if (!payload || !payload.name || !payload.email || !payload.whatsapp || !payload.project) {
    const err = new Error('Missing required contact fields (name, email, whatsapp, project).');
    err.status = 400;
    throw err;
  }

  const to = process.env.EMAIL_TO || process.env.SMTP_USER;
  const from = process.env.EMAIL_FROM || process.env.SMTP_USER;

  const { html, text } = buildEmailBody({ ...payload, submittedAt: payload.submittedAt || new Date().toISOString() });

  const mailOptions = {
    from,
    to,
    subject: `New project inquiry from ${payload.name}`,
    text,
    html,
  };

  const info = await transporter.sendMail(mailOptions);

  // nodemailer returns info object; return it to caller for logging if needed
  return { ok: true, info };
}

module.exports = { sendContactEmail };
