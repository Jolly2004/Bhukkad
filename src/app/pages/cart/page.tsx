"use client";


import CartPage from "@/app/components/cart/page";
import HeaderBar from "../../components/navbar/page";


export default function Home() {
  return (
    <div>
        <HeaderBar/>
    <main>
      <CartPage/>
    </main>
    </div>
  );
}