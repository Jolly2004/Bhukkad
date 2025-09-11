import { NextResponse } from "next/server";
import connectDB from "../../../lib/mongodb";
import Food from "../../../../../models/Food";

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
