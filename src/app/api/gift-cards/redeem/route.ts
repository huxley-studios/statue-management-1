import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import GiftCard from '@/models/GiftCard'

export async function POST(req: Request) {
  await connectDB()
  const { code, address, plinthChoice } = await req.json()
  
  const giftCard = await GiftCard.findOneAndUpdate(
    { activationCode: code, status: { $ne: 'redeemed' } },
    {
      status: 'redeemed',
      recipientDetails: { address, plinthChoice }
    },
    { new: true }
  )

  return NextResponse.json(giftCard)
}
