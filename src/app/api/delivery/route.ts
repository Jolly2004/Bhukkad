import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

// Create MySQL connection
const pool = mysql.createPool({
  host: "localhost",   // change if hosted (like railway / planetscale)
  user: "root",        // your MySQL username
  password: "", // your MySQL password
  database: "food",
    port: Number(process.env.DB_PORT),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      firstName,
      lastName,
      email,
      street,
      city,
      state,
      zip,
      country,
      phone,
    } = body;

    const [result] = await pool.query(
      `INSERT INTO deliveries 
      (firstName, lastName, email, street, city, state, zip, country, phone)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [firstName, lastName, email, street, city, state, zip, country, phone]
    );

    return NextResponse.json({ success: true, message: "Delivery saved!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Error saving data" });
  }
}

