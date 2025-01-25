import { NextResponse } from 'next/server'
import { verify } from 'jsonwebtoken'

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key'

export function middleware(req: Request) {
  const token = req.headers.get('authorization')?.split(' ')[1]
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const decoded = verify(token, SECRET_KEY)
    const requestHeaders = new Headers(req.headers)
    requestHeaders.set('user', JSON.stringify(decoded))
    return NextResponse.next({ request: { headers: requestHeaders } })
  } catch {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
  }
}

export const config = {
  matcher: ['/api/orders/:path*', '/api/gift-cards/:path*']
}
