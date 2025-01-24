import './globals.css'
import { Inter } from 'next/font/google'
import { getServerSession } from "next-auth/next"

const inter = Inter({ subsets: ['latin'] })

export default async function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
