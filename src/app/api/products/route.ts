import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import mysql from 'mysql2/promise';


export async function POST(req: Request) {
  const formData = await req.formData();
  const imageFile = formData.get("image") as File;
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const category = formData.get("category") as string;
  const price = formData.get("price") as string;

  // Save image to public/uploads/
  const bytes = await imageFile.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const fileName = `${Date.now()}_${imageFile.name}`;
  const filePath = path.join(process.cwd(), 'public', 'uploads', fileName);
  await writeFile(filePath, buffer);
  const imageUrl = `/uploads/${fileName}`;

  // Connect to DB and insert
  const db = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'food'
  });

  try {
    const [result] = await db.execute(
      'INSERT INTO products (name, description, category, price, image_url) VALUES (?, ?, ?, ?, ?)',
      [name, description, category, price, imageUrl]
    );

    return NextResponse.json({ success: true, message: "Product added" });
  } catch (err) {
    console.error("DB Error", err);
    return NextResponse.json({ success: false, message: "Database error" });
  }
  
  
}
const connectDB = async () => {
  return mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'food'
  });
};

// GET - List all products
export async function GET() {
  try {
    const db = await connectDB();
    const [rows] = await db.execute('SELECT * FROM products ORDER BY created_at DESC');
    return NextResponse.json(rows);
  } catch (err) {
    console.error("GET /api/products error:", err);
    return NextResponse.json({ success: false, message: "Failed to fetch products" }, { status: 500 });
  }
}


// DELETE - Delete product by ID
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) return NextResponse.json({ success: false, message: "ID missing" });

  const db = await connectDB();
  await db.execute('DELETE FROM products WHERE id = ?', [id]);

  return NextResponse.json({ success: true, message: "Product deleted" });
}
