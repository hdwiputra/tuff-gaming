import { ProductType } from "@/types";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ProductDetail } from "@/components/sections/product-detail";
import { FeatureCarousel } from "@/components/sections/feature-carousel";
import { ModelComparison } from "@/components/sections/model-comparison";
import { TechSpecs } from "@/components/sections/tech-specs";
import { Metadata } from "next";

// Generate metadata untuk SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const slug = (await params).slug;

  // Fetch product data untuk metadata
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${slug}`
  );
  const product: ProductType = await res.json();

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
    };
  }

  return {
    title: `TUFF® | ${product.name} || "TUFF® Gaming Controllers`,
    description:
      product.description ||
      `Discover ${product.name} with amazing features and specifications.`,
    openGraph: {
      title: product.name,
      description:
        product.description ||
        `Discover ${product.name} with amazing features and specifications.`,
      images: [
        {
          url: product.thumbnail,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description:
        product.description ||
        `Discover ${product.name} with amazing features and specifications.`,
      images: [product.thumbnail],
    },
    keywords: [
      product.name,
      product.slug,
      product.tags,
      "product",
      "shop",
      "buy",
    ]
      .filter(Boolean)
      .join(", "),
    alternates: {
      canonical: `/products/${slug}`,
    },
  };
}

export default async function Detail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;

  // Get currentUserId from middleware headers
  const headersList = await headers();
  const currentUserId = headersList.get("x-userId");

  // Fetch product with user context
  const fetchHeaders: HeadersInit = {};
  if (currentUserId) {
    fetchHeaders["x-userId"] = currentUserId;
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${slug}`,
    {
      headers: fetchHeaders,
    }
  );
  const product: ProductType = await res.json();

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <ProductDetail product={product} currentUserId={currentUserId} />
      <FeatureCarousel />
      <ModelComparison />
      <TechSpecs />
      <Footer />
    </div>
  );
}
