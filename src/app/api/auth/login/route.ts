import { NextResponse } from 'next/server'
import { sign } from 'jsonwebtoken'
import { compare } from 'bcryptjs'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'

const SECRET_KEY = process.env.JWT_SECRET!

export async function POST(req: Request) {
  const { email, password } = await req.json()
  await connectDB()
  
  const user = await User.findOne({ email })
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })
  
  const validPassword = await compare(password, user.password)
  if (!validPassword) return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
  
  const token = sign({ id: user._id, email, isAdmin: user.isAdmin }, SECRET_KEY, { expiresIn: '24h' })
  return NextResponse.json({ token })
}
