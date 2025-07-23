"use client";

import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Box } from "lucide-react";
import { AddWishlistButton } from "@/components/client-components/add-wishlist";

import type { ProductDetailProps } from "@/types";

export function ProductDetail({ product, currentUserId }: ProductDetailProps) {
  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6 md:px-8 lg:px-12 py-4">
          <nav className="text-sm text-gray-600 font-medium">
            <Link href="/products" className="hover:text-orange-500">
              Products
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-semibold">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Detail Section */}
      <div className="container mx-auto px-6 md:px-8 lg:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Product Images */}
          <div className="lg:col-span-2 space-y-6">
            {/* 2x2 Images Grid */}
            <div className="grid grid-cols-2 gap-4">
              {product.images &&
                product.images.slice(0, 4).map((image, index) => (
                  <div
                    key={index}
                    className="aspect-square bg-white rounded-lg overflow-hidden shadow-sm"
                  >
                    <Image
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Product Title and Price */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {product.name.toUpperCase()}
              </h1>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-3xl font-bold text-gray-900">
                  ${product.price}
                </span>
              </div>
              {product.tags && (
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-sm font-medium bg-gray-100 text-gray-700 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Product Description */}
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
              <p className="text-gray-700 leading-relaxed">
                The Reflex comes standard with a black universal protection
                case, a 6-foot USB-C cable, 4 extra thumbsticks.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button className="w-full bg-orange-500 hover:bg-orange-600 text-black font-semibold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 mt-8">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
                  />
                </svg>
                ADD TO CART
              </button>
              <AddWishlistButton
                product={product}
                currentUserId={currentUserId}
              />
              {/* Warranty and Returns */}
              <div className="space-y-2 mt-8">
                <div className="flex items-center gap-2 text-gray-700 text-sm">
                  <ShieldCheck className="w-5 h-5 text-gray-700" />
                  <span>1-year warranty</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700 text-sm">
                  <Box className="w-5 h-5 text-gray-700" />
                  <span>Free 30-day returns on pre-configured</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
