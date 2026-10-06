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
      <main>
        <Hero image={heroImage} />
        <MostLoved items={menuItems} onAdd={(item) => setCart((c) => [...c, item])} />
      </main>
    </>
  );
}