import { NextResponse } from "next/server";
import mysql, { ResultSetHeader } from "mysql2/promise";

// ✅ MySQL connection pool
const pool = mysql.createPool({
  host: "localhost",
  user: "root",          // your MySQL username
  password: "",          // your MySQL password
  database: "food",  
    port: Number(process.env.DB_PORT),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,    // your DB name
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, items, total } = body;

    if (!userId || !items || !total) {
      return NextResponse.json(
        { success: false, error: "Missing fields" },
        { status: 400 }
      );
    }

    console.log("🛒 Saving order:", body);

    const [result] = await pool.query<ResultSetHeader>(
      "INSERT INTO orders (user_id, items, total, status) VALUES (?, ?, ?, ?)",
      [userId, JSON.stringify(items), total, "Placed"]
    );

    console.log("✅ Order Inserted:", result);

    return NextResponse.json({ success: true, orderId: result.insertId });
  } catch (error) {
    console.error("❌ Error saving order:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save order" },
      { status: 500 }
    );
  }
}
