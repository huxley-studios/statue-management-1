import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'
import { hash } from 'bcryptjs'

export async function GET() {
  try {
    await connectDB()
    
    // Check if admin already exists
    const existingAdmin = await User.findOne({ isAdmin: true })
    if (existingAdmin) {
      return NextResponse.json({ message: "Admin already exists" })
    }

    const hashedPassword = await hash("Ayspn1qt1.", 12)
    const user = await User.create({ 
      email: "alan@huxleystudios.com.au", 
      password: hashedPassword, 
      isAdmin: true 
    })
    
    // Remove sensitive info
    const safeUser = {
      email: user.email,
      isAdmin: user.isAdmin,
      id: user._id
    }
    
    return NextResponse.json(safeUser)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
