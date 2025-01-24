import mongoose from 'mongoose';

const GiftCardSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  activationCode: { type: String, unique: true, required: true },
  message: String,
  orderDetails: {
    size: { type: String, enum: ['small', 'medium', 'large'], required: true },
    numberOfPeople: { type: Number, min: 1, max: 6, required: true }
  },
  status: { 
    type: String,
    enum: ['created', 'printed', 'shipped', 'redeemed'],
    default: 'created'
  },
  recipientDetails: {
    address: {
      street: String,
      city: String,
      state: String,
      zip: String
    },
    plinthChoice: String
  }
});

export default mongoose.models.GiftCard || mongoose.model('GiftCard', GiftCardSchema);
