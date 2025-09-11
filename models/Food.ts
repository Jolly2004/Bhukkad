import mongoose, { Schema, Document, Model } from "mongoose";

export interface IFood extends Document {
  name: string;
  description: string;
  price: number;
  type: "veg" | "nonveg";
  photo: string;
}

const FoodSchema: Schema<IFood> = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    type: { type: String, enum: ["veg", "nonveg"], required: true },
    photo: { type: String, required: true }, // store URL or base64
  },
  { timestamps: true }
);

const Food: Model<IFood> = mongoose.models.Food || mongoose.model<IFood>("Food", FoodSchema);

export default Food;
