import { google } from "googleapis";

function getClient() {
  const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL?.trim();
  const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.trim().replaceAll("\\n", "\n");
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID?.trim();

  if (!clientEmail || !privateKey || !spreadsheetId) {
    console.warn("[Google Sheets] Configuration missing");
    return null;
  }

  const auth = new google.auth.GoogleAuth({
    credentials: { client_email: clientEmail, private_key: privateKey },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return { sheets: google.sheets({ version: "v4", auth }), spreadsheetId };
}

export async function appendRenderLead(data: {
  name: string;
  phone: string;
  email: string;
  postcode: string;
  message: string;
  gclid: string;
  timestamp: string;
}) {
  const client = getClient();
  if (!client) {
    console.error("[Google Sheets] Cannot append — client not configured");
    return;
  }

  const row = [
    data.timestamp,
    data.name,
    data.email,
    `'${data.phone}`, // Prefix with ' to prevent Excel date formatting
    data.postcode,
    data.message,
    data.gclid,
    "New",
  ];

  await client.sheets.spreadsheets.values.append({
    spreadsheetId: client.spreadsheetId,
    range: "Render Leads!A:H",
    valueInputOption: "RAW",
    requestBody: { values: [row] },
  });
}
