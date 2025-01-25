import { NextResponse } from 'next/server'
import { hash } from 'bcryptjs'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'

export async function GET() {
 await connectDB()
 const users = await User.find().select('-password')
 return NextResponse.json(users)
}

export async function POST(req: Request) {
 await connectDB()
 const { email, password, isAdmin } = await req.json()
 const hashedPassword = await hash(password, 12)
 const user = await User.create({ email, password: hashedPassword, isAdmin })
 const { password: pwd, ...userWithoutPassword } = user.toObject()
 return NextResponse.json(userWithoutPassword)
}
