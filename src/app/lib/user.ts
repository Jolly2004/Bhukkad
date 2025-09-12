// src/lib/user.ts
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User, { IUser } from "../../../models/User";


const MONGO_URI = process.env.MONGO_URI as string;

export async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  return mongoose.connect(MONGO_URI);
}

export async function createUser(
  name: string,
  email: string,
  address: string,
  password: string
): Promise<IUser> {
  await connectDB();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, email, address, password: hashedPassword });
  return user.save();
}

// ✅ Add this function to verify login credentials
export async function verifyUser(email: string, password: string): Promise<IUser | false> {
  await connectDB();
  const user = await User.findOne({ email });
  if (!user) return false;

  const isMatch = await bcrypt.compare(password, user.password);
  return isMatch ? user : false;
}
