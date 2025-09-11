import Image from "next/image";
import HeroSection from "./components/hero/page";
import OffersSection from "./components/offersection/page";
import HeaderBar from "./components/navbar/page";

export default function Home() {
  return (
   <div>
    <main>
        <HeaderBar/>
      </main>
    <HeroSection/>
    <main>
      <OffersSection/>
      
    </main>
   </div>
  );
}
