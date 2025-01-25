import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'
import { hash } from 'bcryptjs'

export async function POST(req: Request) {
  await connectDB()
  const { email, password, isAdmin } = await req.json()
  const hashedPassword = await hash(password, 12)
  const user = await User.create({ email, password: hashedPassword, isAdmin })
  return NextResponse.json(user)
}
