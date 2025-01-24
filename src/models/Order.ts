import mongoose from 'mongoose';
import { sendOrderUpdate } from '@/lib/email';

const OrderSchema = new mongoose.Schema({
  type: { type: String, enum: ['direct', 'gift_card'], required: true },
  status: { 
    type: String, 
    enum: ['new', 'processing', 'modeling', 'printing', 'qc', 'shipped'],
    default: 'new'
  },
  size: { type: String, enum: ['small', 'medium', 'large'], required: true },
  numberOfPeople: { type: Number, min: 1, max: 6, required: true },
  plinthStyle: String,
  driveFolderId: String,
  customerDetails: {
    email: String,
    shippingAddress: {
      street: String,
      city: String,
      state: String,
      zip: String
    }
  },
  createdAt: { type: Date, default: Date.now }
});

OrderSchema.post('findOneAndUpdate', async function(doc) {
  if (doc.status) {
    await sendOrderUpdate(doc._id, doc.status);
  }
});

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
