// src/app/api/signup/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createUser } from "../../lib/user";

export async function POST(req: NextRequest) {
  try {
    const { name, email, address, password } = await req.json();

    if (!name || !email || !address || !password) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    const user = await createUser(name, email, address, password);

    return NextResponse.json({
      success: true,
      message: "User registered successfully",
      user: { id: user._id, name: user.name, email: user.email, address: user.address },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
