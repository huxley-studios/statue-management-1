import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Order from '@/models/Order'

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB()
  const { status } = await req.json()
  const order = await Order.findByIdAndUpdate(
    params.id,
    { status },
    { new: true }
  )
  return NextResponse.json(order)
}
