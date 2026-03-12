import { google } from "googleapis";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function authorize() {
  if (!process.env.GMAIL_CREDENTIALS_BASE64 || !process.env.GMAIL_TOKEN_BASE64) {
    throw new Error("Gmail credentials not found in environment");
  }

  const credentials = JSON.parse(
    Buffer.from(process.env.GMAIL_CREDENTIALS_BASE64, "base64").toString("utf-8")
  );
  const token = JSON.parse(
    Buffer.from(process.env.GMAIL_TOKEN_BASE64, "base64").toString("utf-8")
  );

  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
  oAuth2Client.setCredentials(token);

  if (!token.access_token || (token.expiry_date && token.expiry_date < Date.now())) {
    const { credentials: refreshed } = await oAuth2Client.refreshAccessToken();
    oAuth2Client.setCredentials(refreshed);
  }

  return oAuth2Client;
}

export async function sendEnquiryNotification(data: {
  name: string;
  phone: string;
  email: string;
  postcode: string;
  message: string;
}) {
  const auth = await authorize();
  const gmail = google.gmail({ version: "v1", auth });

  const htmlBody = `
    <h2>New Render Cleaning Enquiry</h2>
    <table style="border-collapse:collapse;font-family:sans-serif;">
      <tr><td style="padding:8px;font-weight:bold;">Name</td><td style="padding:8px;">${escapeHtml(data.name)}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;">Phone</td><td style="padding:8px;">${escapeHtml(data.phone)}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;">Email</td><td style="padding:8px;">${escapeHtml(data.email)}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;">Postcode</td><td style="padding:8px;">${escapeHtml(data.postcode)}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;">Message</td><td style="padding:8px;">${escapeHtml(data.message || "No message")}</td></tr>
    </table>
    <p style="color:#64748b;font-size:12px;margin-top:16px;">From somersetrendercleaning.co.uk</p>
  `.trim();

  const from = "info@somersetwindowcleaning.co.uk";
  const to = "info@somersetwindowcleaning.co.uk";
  const safeName = data.name.replace(/[\r\n]/g, " ");
  const safePostcode = data.postcode.replace(/[\r\n]/g, " ");
  const subject = `Render Cleaning Enquiry — ${safeName} (${safePostcode})`;

  const message = [
    `From: Somerset Render Cleaning <${from}>`,
    `To: ${to}`,
    `Subject: ${subject}`,
    "MIME-Version: 1.0",
    "Content-Type: text/html; charset=utf-8",
    "",
    htmlBody,
  ].join("\r\n");

  const raw = Buffer.from(message).toString("base64url");

  await gmail.users.messages.send({
    userId: "me",
    requestBody: { raw },
  });
}
