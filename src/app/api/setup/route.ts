import { NextResponse } from 'next/server'
import { hash } from 'bcryptjs'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'

export async function GET() {
  await connectDB()
  const hashedPassword = await hash("Ayspn1qt1.", 12)
  
  const existingAdmin = await User.findOne({ isAdmin: true })
  if (existingAdmin) {
    return NextResponse.json({ message: "Admin already exists" })
  }
  
  const user = await User.create({ 
    email: "alan@huxleystudios.com.au",
    password: hashedPassword,
    isAdmin: true 
  })
  
  return NextResponse.json({ email: user.email, isAdmin: user.isAdmin })
}
