import { NextResponse } from 'next/server'
import { google } from 'googleapis'

export async function POST(req: Request) {
  const { orderId } = await req.json()
  
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY
    },
    scopes: ['https://www.googleapis.com/auth/drive.file']
  })

  const drive = google.drive({ version: 'v3', auth })
  
  const folder = await drive.files.create({
    requestBody: {
      name: `Order-${orderId}`,
      mimeType: 'application/vnd.google-apps.folder'
    }
  })

  return NextResponse.json({ folderId: folder.data.id })
}
