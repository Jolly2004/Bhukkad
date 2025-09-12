import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  user: { type: String, required: true },
  items: [
    {
      _id: String,
      name: String,
      price: Number,
      quantity: Number,
      type: String,
    },
  ],
  deliveryAddress: { type: String, required: true },
  paymentType: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  razorpayPaymentId: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
