import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import GiftCard from '@/models/GiftCard'

export async function GET(
  request: Request,
  { params }: { params: { code: string } } & { searchParams: URLSearchParams }
) {
  await connectDB()
  const giftCard = await GiftCard.findOne({ activationCode: params.code })
  return NextResponse.json(giftCard)
}

export async function PUT(
  request: Request,
  { params }: { params: { code: string } } & { searchParams: URLSearchParams }
) {
  await connectDB()
  const data = await request.json()
  const giftCard = await GiftCard.findOneAndUpdate(
    { activationCode: params.code },
    data,
    { new: true }
  )
  return NextResponse.json(giftCard)
}
