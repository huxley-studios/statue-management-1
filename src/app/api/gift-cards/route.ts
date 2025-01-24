import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import GiftCard from '@/models/GiftCard'

export async function GET() {
  await connectDB()
  const giftCards = await GiftCard.find().populate('orderId').sort({ createdAt: -1 })
  return NextResponse.json(giftCards)
}

export async function POST(req: Request) {
  await connectDB()
  const data = await req.json()
  const giftCard = await GiftCard.create(data)
  return NextResponse.json(giftCard)
}
