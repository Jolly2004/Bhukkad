import { NextResponse } from "next/server";
import connectDB from "../../../lib/mongodb";
import Food from "../../../../../models/Food";

// ✅ POST: Add food
export async function POST(req: Request) {
  try {
    const { name, description, price, type, photo } = await req.json();

    if (!name || !description || !price || !type || !photo) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    await connectDB();

    const newFood = new Food({ name, description, price, type, photo });
    await newFood.save();

    return NextResponse.json({ message: "Food item added successfully", food: newFood }, { status: 201 });
  } catch (error: any) {
    console.error("❌ Food API Error:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// ✅ GET: Fetch all foods
export async function GET() {
  try {
    await connectDB();
    const foods = await Food.find();
    return NextResponse.json({ foods });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// ✅ DELETE: Delete food by ID
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ message: "Food ID required" }, { status: 400 });
    }

    await connectDB();
    await Food.findByIdAndDelete(id);

    return NextResponse.json({ message: "Food item deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
