import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

// ⚡ If you are NOT using hashed passwords, no bcrypt needed

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // 1. Connect to DB
    const db = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",  // ⚠️ replace with your DB password
      database: "food",
    });

    // 2. Get user
    const [rows]: any = await db.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const user = rows[0];

    // 3. Compare plain password (⚠️ since you said no hashing yet)
    if (user.password !== password) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // 4. Success
    return NextResponse.json(
      { user: { id: user.id, name: user.name, email: user.email } },
      { status: 200 }
    );
  } catch (err) {
    console.error("Login API error:", err);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
