import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import GiftCard from '@/models/GiftCard'

export async function GET(request: Request, context: { params: { code: string } }) {
  await connectDB()
  const giftCard = await GiftCard.findOne({ activationCode: context.params.code })
  return NextResponse.json(giftCard)
}

export async function PUT(request: Request, context: { params: { code: string } }) {
  await connectDB()
  const data = await request.json()
  const giftCard = await GiftCard.findOneAndUpdate(
    { activationCode: context.params.code },
    data,
    { new: true }
  )
  return NextResponse.json(giftCard)
}
