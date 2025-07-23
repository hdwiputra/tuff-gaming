import Image from "next/image";
import Link from "next/link";

import type { ProductType } from "@/types";

export function ShopByController({ products }: { products: ProductType[] }) {
  return (
    <section className="bg-black text-white py-16 md:py-20 lg:py-24">
      <div className="container mx-auto px-6 md:px-8 lg:px-12">
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-orange-500 uppercase tracking-wide">
            Trending Designs
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {products.map((product) => (
            <Link key={product.slug} href={`/products/${product.slug}`}>
              <div className="group cursor-pointer">
                <div className="bg-gray-800 rounded-lg overflow-hidden mb-3 aspect-[4/3] relative">
                  <Image
                    src={product.thumbnail || product.thumbnail}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: "cover" }}
                    className="group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-sm font-semibold uppercase tracking-wide">
                  {product.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link href="/products">
            <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-8 py-3 rounded-lg uppercase tracking-wide transition-colors duration-300 mt-10 cursor-pointer">
              Show More Gamepad
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
