"use client";

import FoodsPage from"../app/components/cards/page";  // ✅ adjust the path if your FoodsPage is in app/foods/page.tsx
import HeroSection from "./components/hero/page";
import HeaderBar from "./components/navbar/page";
import OffersSection from "./components/offersection/page";

export default function Home() {
  return (
    <div>
        <HeaderBar/>
    <main>
       <HeroSection/>
       <OffersSection/>
             <FoodsPage />
    </main>
    </div>
  );
}
