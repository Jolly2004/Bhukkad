"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

type CartItem = {
  id: number;
  name: string;
  price: number;
  image_url: string;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Omit<CartItem, "quantity">) => void;
  increaseQty: (id: number) => void;
  decreaseQty: (id: number) => void;
  removeFromCart: (id: number) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // 🔹 Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    const expiry = localStorage.getItem("cartExpiry");

    if (storedCart && expiry) {
      const now = new Date().getTime();
      if (now < parseInt(expiry)) {
        setCart(JSON.parse(storedCart));
      } else {
        localStorage.removeItem("cart");
        localStorage.removeItem("cartExpiry");
      }
    }
  }, []);

  // 🔹 Save cart whenever it changes
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
      const oneDayLater = new Date().getTime() + 24 * 60 * 60 * 1000; // 1 day
      localStorage.setItem("cartExpiry", oneDayLater.toString());
    } else {
      localStorage.removeItem("cart");
      localStorage.removeItem("cartExpiry");
    }
  }, [cart]);

  const addToCart = (product: Omit<CartItem, "quantity">) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const increaseQty = (id: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (id: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, increaseQty, decreaseQty, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
};
