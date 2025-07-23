"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, ShoppingCart, Calendar, Tag } from "lucide-react";
import { showToast } from "@/components/layout/toastProvider"; // Adjust path as needed
import { WishlistItem } from "@/types";

interface WishlistContentProps {
  wishlistItems: WishlistItem[];
}

export function WishlistContent({
  wishlistItems: initialItems,
}: WishlistContentProps) {
  const [wishlistItems, setWishlistItems] =
    useState<WishlistItem[]>(initialItems);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "name" | "price">("date");
  const [removingItems, setRemovingItems] = useState<Set<string>>(new Set());

  // Filter items based on search
  const filteredItems = wishlistItems.filter((item) => {
    const product = item.products[0];
    if (!product) return false;

    return (
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.tags &&
        product.tags.some((tag: string) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        ))
    );
  });

  // Sort items
  const sortedItems = [...filteredItems].sort((a, b) => {
    const productA = a.products[0];
    const productB = b.products[0];

    if (!productA || !productB) return 0;

    switch (sortBy) {
      case "name":
        return productA.name.localeCompare(productB.name);
      case "price":
        return productA.price - productB.price;
      case "date":
      default:
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }
  });

  const removeFromWishlist = async (itemId: string) => {
    const item = wishlistItems.find((item) => item._id === itemId);
    if (!item || !item.products[0]) return;

    const productId = item.products[0]._id;
    const productName = item.products[0].name;

    // Prevent multiple clicks
    if (removingItems.has(itemId)) return;

    // Add to removing set for loading state
    setRemovingItems((prev) => new Set(prev).add(itemId));

    // Optimistically remove from UI
    setWishlistItems((items) => items.filter((item) => item._id !== itemId));

    try {
      const response = await fetch("/api/wishlist", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
        credentials: "include",
      });

      if (!response.ok) {
        // Revert optimistic update on error
        setWishlistItems(initialItems);
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Failed to remove item: ${response.status}`
        );
      }

      // Success - show confirmation with toast
      showToast.wishlist.removed(productName);
    } catch (error) {
      console.error("Error removing from wishlist:", error);

      // Revert optimistic update on error
      setWishlistItems(initialItems);

      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to remove item from wishlist";

      showToast.error(`Failed to remove from wishlist: ${errorMessage}`);
    } finally {
      // Remove from removing set
      setRemovingItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(itemId);
        return newSet;
      });
    }
  };

  const formatDate = (dateString: string | Date) => {
    const date =
      typeof dateString === "string" ? new Date(dateString) : dateString;
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  const handleShareWishlist = () => {
    // Copy wishlist URL to clipboard
    const currentUrl = window.location.href;
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        showToast.success("Wishlist link copied to clipboard!");
      })
      .catch(() => {
        showToast.error("Failed to copy link to clipboard");
      });
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header Section */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6 md:px-8 lg:px-12 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                My Wishlist
              </h1>
              <p className="text-gray-600">
                {wishlistItems.length}{" "}
                {wishlistItems.length === 1 ? "item" : "items"} in your wishlist
              </p>
            </div>
            <button
              onClick={handleShareWishlist}
              className="bg-orange-500 hover:bg-orange-600 text-black font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
            >
              Share Wishlist
            </button>
          </div>

          {/* Search and Sort */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name or tag"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-black"
            >
              <option value="date">Sort by: Date Added</option>
              <option value="name">Sort by: Name</option>
              <option value="price">Sort by: Price</option>
            </select>
          </div>
        </div>
      </div>

      {/* Wishlist Items */}
      <div className="container mx-auto px-6 md:px-8 lg:px-12 py-8">
        {sortedItems.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center">
            <p className="text-gray-500 text-lg mb-4">
              {searchTerm
                ? "No items match your search."
                : "Your wishlist is empty."}
            </p>
            <Link
              href="/products"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-black font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedItems.map((item, index) => {
              const product = item.products[0];
              const isRemoving = removingItems.has(item._id);

              if (!product) return null;

              return (
                <div
                  key={item._id}
                  className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 ${
                    isRemoving ? "opacity-50 pointer-events-none" : ""
                  }`}
                >
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Product Image */}
                      <Link
                        href={`/products/${product.slug}`}
                        className="lg:w-48 flex-shrink-0"
                      >
                        <div className="aspect-video lg:aspect-square bg-gray-100 rounded-lg overflow-hidden">
                          <Image
                            src={product.thumbnail}
                            alt={product.name}
                            width={300}
                            height={300}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                          />
                        </div>
                      </Link>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/products/${product.slug}`}
                          className="text-xl font-bold text-gray-900 hover:text-orange-500 transition-colors"
                        >
                          {product.name}
                        </Link>

                        {/* Tags */}
                        {product.tags && (
                          <div className="flex flex-wrap items-center gap-2 mt-2">
                            {product.tags.map((tag: string) => (
                              <span
                                key={tag}
                                className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Excerpt */}
                        {product.excerpt && (
                          <p className="text-gray-600 mt-3 line-clamp-2">
                            {product.excerpt}
                          </p>
                        )}

                        {/* Additional Info */}
                        <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-500">
                          {product.releaseDate && (
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>
                                Release: {formatDate(product.releaseDate)}
                              </span>
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            <Tag className="w-4 h-4" />
                            <span>Added: {formatDate(item.createdAt)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Price and Action */}
                      <div className="lg:w-48 flex-shrink-0">
                        <div className="flex flex-col gap-3">
                          {/* Price */}
                          <div className="text-right lg:text-left">
                            <span className="text-2xl font-bold text-gray-900">
                              ${product.price.toFixed(2)}
                            </span>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex flex-col gap-2">
                            <button
                              onClick={() => {
                                // Add to cart functionality would go here
                                showToast.success(
                                  `${product.name} added to cart!`
                                );
                              }}
                              className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg font-semibold transition-colors duration-200 bg-orange-500 hover:bg-orange-600 text-black"
                            >
                              <ShoppingCart className="w-4 h-4" />
                              Add to Cart
                            </button>
                            <button
                              onClick={() => removeFromWishlist(item._id)}
                              disabled={isRemoving}
                              className={`w-full py-2 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2 ${
                                isRemoving
                                  ? "bg-gray-200 cursor-not-allowed text-gray-400"
                                  : "border border-gray-300 text-gray-600 hover:bg-gray-50 hover:text-red-600 hover:border-red-300"
                              }`}
                            >
                              {isRemoving ? (
                                <>
                                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600"></div>
                                  Removing...
                                </>
                              ) : (
                                "Remove"
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Divider for visual separation */}
                  {index < sortedItems.length - 1 && (
                    <div className="border-t border-gray-100"></div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
