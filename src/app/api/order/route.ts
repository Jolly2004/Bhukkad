import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/user";
import Order from "@/app/lib/order";

// POST: create new order (already done)
export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const { user, items, deliveryAddress, paymentType, totalAmount, razorpayPaymentId } = body;

    const order = await Order.create({
      user,
      items,
      deliveryAddress,
      paymentType,
      totalAmount,
      razorpayPaymentId,
    });

    return NextResponse.json({ success: true, order });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

// GET: fetch all orders
export async function GET() {
  try {
    await connectDB();
    const orders = await Order.find().sort({ createdAt: -1 }); // newest first
    return NextResponse.json({ success: true, orders });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
