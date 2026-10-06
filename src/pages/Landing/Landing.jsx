import { useState } from "react";
import Header from "@/components/Header/Header";
import Hero from "@/components/Hero/Hero";
import MostLoved from "@/components/MostLoved/MostLoved";
import { menuItems, heroImage } from "@/data/menu";

export default function Landing() {
  const [cart, setCart] = useState([]);

  return (
    <>
      <Header cartCount={cart.length} />
      
    </>
  );
}