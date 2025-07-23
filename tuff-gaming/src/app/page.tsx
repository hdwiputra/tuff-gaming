export const dynamic = "force-dynamic";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { ShopByController } from "@/components/sections/shop-by-controller";
import { WhyTuff } from "@/components/sections/why-tuff";
import { Testimonials } from "@/components/sections/testimonials";
import { ShopByCollection } from "@/components/sections/shop-by-collection";
import { Achievements } from "@/components/sections/achievements";
import { ProductType } from "@/types";

export default async function HomePage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/`);
  const products: ProductType[] = await res.json();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ShopByController products={products} />
        <WhyTuff />
        <Testimonials />
        <ShopByCollection />
        <Achievements />
      </main>
      <Footer />
    </div>
  );
}
