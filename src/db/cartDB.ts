import Dexie, { Table } from "dexie";

export interface Food {
  _id: string;
  name: string;
  description: string;
  price: number;
  type: "veg" | "nonveg";
  photo: string;
  quantity?: number;
}

class CartDB extends Dexie {
  cart!: Table<Food>;

  constructor() {
    super("CartDB");
    this.version(1).stores({
      cart: "_id,name,price,quantity,type,photo,description"
    });
  }
}

export const db = new CartDB();
