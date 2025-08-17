import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    // connect to MySQL
    const connection = await mysql.createConnection({
      host: "localhost",   // change if remote
      user: "root",        // your mysql username
      password: "", // your mysql password
      database: "food",    // your database
    });

    // insert user
    await connection.execute(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, password]   // ⚠️ store hashed password in real apps
    );

    connection.end();

    return NextResponse.json({ success: true, message: "Account created successfully" });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
