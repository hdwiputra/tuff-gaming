"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";
import { showToast } from "@/components/layout/toastProvider"; // Adjust path as needed
import type { ProductType } from "@/types";
import { useRouter } from "next/navigation";

type ProductGridProps = {
  products: ProductType[];
  loading: boolean;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    hasNext: boolean;
    hasPrev: boolean;
    limit: number;
  };
  currentUserId?: string | null;
  onLoadMore: () => void;
  searchQuery: string;
  selectedTags: string[];
  sortBy: string;
  onSearchChange: (query: string) => void;
  onTagsChange: (tags: string[]) => void;
  onSortChange: (sort: string) => void;
  onClearFilters: () => void;
  onClearAll: () => void;
};

export function ProductGrid({
  products,
  loading,
  pagination,
  currentUserId,
  onLoadMore,
  searchQuery,
  selectedTags,
  sortBy,
  onSearchChange,
  onTagsChange,
  onSortChange,
  onClearFilters,
  onClearAll,
}: ProductGridProps) {
  const [processingWishlist, setProcessingWishlist] = useState<Set<string>>(
    new Set()
  );
  const [optimisticWishlistState, setOptimisticWishlistState] = useState<
    Map<string, boolean>
  >(new Map());
  const filterTags = ["Reflex", "FPS", "Pro"];
  const router = useRouter();

  const handleTagToggle = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];
    onTagsChange(newTags);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value);
  };

  const handleClearFilters = () => {
    onClearFilters();
  };

  const handleClearAll = () => {
    onClearAll();
  };

  const getWishlistStatus = (productId: string, backendStatus: boolean) => {
    // Use optimistic state if available, otherwise use backend data
    if (optimisticWishlistState.has(productId)) {
      return optimisticWishlistState.get(productId)!;
    }
    return backendStatus;
  };

  const handleWishlist = async (productId: string) => {
    const product = products.find((p) => p._id === productId);
    if (!product) return;

    const currentWishlistStatus = getWishlistStatus(
      productId,
      product.isWishlisted || false
    );

    // Prevent multiple clicks on the same item
    if (processingWishlist.has(productId)) return;

    setProcessingWishlist((prev) => new Set(prev).add(productId));

    // Optimistically update the UI
    const newWishlistState = !currentWishlistStatus;
    setOptimisticWishlistState((prev) => {
      const newMap = new Map(prev);
      newMap.set(productId, newWishlistState);
      return newMap;
    });

    try {
      if (currentWishlistStatus) {
        // Remove from wishlist
        await handleRemoveWishlist(productId);
        showToast.wishlist.removed(product.name);
      } else {
        // Add to wishlist
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlist`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ productId }),
            credentials: "include",
          }
        );

        if (res.ok) {
          showToast.wishlist.added(product.name);
        } else {
          // Revert optimistic update on error
          setOptimisticWishlistState((prev) => {
            const newMap = new Map(prev);
            newMap.delete(productId);
            return newMap;
          });
          const errorData = await res.json().catch(() => ({}));
          throw new Error(
            errorData.message || `Server error: ${res.status} ${res.statusText}`
          );
        }
      }
    } catch (error) {
      console.error("Error managing wishlist:", error);
      // Revert optimistic update on error
      setOptimisticWishlistState((prev) => {
        const newMap = new Map(prev);
        newMap.delete(productId);
        return newMap;
      });

      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";

      if (currentWishlistStatus) {
        showToast.error(`Failed to remove from wishlist: ${errorMessage}`);
      } else {
        showToast.error(`Failed to add to wishlist: ${errorMessage}`);
      }
    } finally {
      setProcessingWishlist((prev) => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
    }
  };

  const handleRemoveWishlist = async (productId: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlist`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId }),
          credentials: "include",
        }
      );

      if (res.ok) {
        // Success message handled in parent function
      } else {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Server error: ${res.status} ${res.statusText}`
        );
      }
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      throw error;
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 md:px-8 lg:px-12">
        {/* Header with Search and Sort */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              TUFF REFLEX
            </h2>
            <p className="text-gray-600">
              Showing {products.length} of {pagination.totalItems} products
              {pagination.totalPages > 1 && (
                <span className="ml-2">
                  (Page {pagination.currentPage} of {pagination.totalPages})
                </span>
              )}
            </p>
          </div>

          <div className="mt-6 lg:mt-0 flex flex-col sm:flex-row gap-4 lg:items-center">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full sm:w-64 px-4 py-2 pl-10 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                autoComplete="off"
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-gray-900">
                Sort by:
              </label>
              <select
                value={sortBy}
                onChange={handleSortChange}
                className="border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
              >
                <option value="position">Position</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="name-a-z">Name: A to Z</option>
                <option value="name-z-a">Name: Z to A</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                SHOPPING OPTIONS
              </h3>

              {/* Filter Tags */}
              <div className="mb-8">
                <h4 className="text-sm font-medium text-gray-900 mb-4">
                  PRODUCT TYPE
                </h4>
                <div className="space-y-3">
                  {filterTags.map((tag) => (
                    <label
                      key={tag}
                      className="flex items-center cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedTags.includes(tag)}
                        onChange={() => handleTagToggle(tag)}
                        className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                      />
                      <span className="ml-3 text-sm text-gray-700">{tag}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              {(selectedTags.length > 0 || searchQuery.trim()) && (
                <button
                  onClick={handleClearFilters}
                  className="text-sm text-orange-500 hover:text-orange-600 font-medium cursor-pointer mb-4"
                >
                  Clear All Filters
                </button>
              )}

              {/* Clear All Button */}
              <div className="mt-4">
                <button
                  onClick={handleClearAll}
                  className="w-full px-4 py-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors duration-200 cursor-pointer shadow-sm"
                >
                  Reset All
                </button>
              </div>
            </div>
          </div>

          {/* Product Grid with Infinite Scroll */}
          <div className="lg:col-span-3 relative">
            {/* Loading Overlay */}
            {loading && products.length > 0 && (
              <div className="absolute inset-0 bg-white/90 z-20 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                  {Array.from({ length: 8 }).map((_, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg shadow-sm overflow-hidden"
                    >
                      {/* Image Skeleton */}
                      <div className="aspect-square bg-gray-200 animate-pulse"></div>

                      <div className="p-4 space-y-3">
                        {/* Product Name Skeleton */}
                        <div className="space-y-2">
                          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                          <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                        </div>

                        {/* Price Skeleton */}
                        <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse"></div>

                        {/* Tags Skeleton */}
                        <div className="flex gap-1">
                          <div className="h-6 bg-gray-200 rounded w-12 animate-pulse"></div>
                          <div className="h-6 bg-gray-200 rounded w-8 animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {loading && products.length === 0 ? (
              /* Initial Loading */
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                <span className="ml-3 text-gray-600">Loading products...</span>
              </div>
            ) : products.length > 0 ? (
              /* Products with Infinite Scroll */
              <div className="min-h-screen">
                <InfiniteScroll
                  dataLength={products.length}
                  next={onLoadMore}
                  hasMore={pagination.hasNext && !loading}
                  loader={
                    <div className="flex justify-center items-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                      <span className="ml-3 text-gray-600">
                        Loading more products...
                      </span>
                    </div>
                  }
                  endMessage={
                    <div className="text-center py-8">
                      <p className="text-gray-500">
                        {pagination.totalItems === 1
                          ? "You've seen the only product"
                          : "You've seen all products"}
                      </p>
                    </div>
                  }
                  scrollThreshold={0.95}
                  style={{ overflow: "visible" }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                    {products.map((product) => {
                      const isInWishlist = getWishlistStatus(
                        product._id,
                        product.isWishlisted || false
                      );
                      const isProcessing = processingWishlist.has(product._id);

                      return (
                        <div
                          key={product.slug}
                          className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 relative"
                        >
                          {/* Wishlist Heart Button */}
                          <button
                            onClick={() => {
                              if (
                                !currentUserId ||
                                currentUserId === "null" ||
                                currentUserId === "undefined"
                              ) {
                                showToast.wishlist.loginRequired();
                                router.push("/login");
                              } else {
                                handleWishlist(product._id);
                              }
                            }}
                            disabled={isProcessing}
                            className={`absolute bottom-3 right-3 z-10 p-2 rounded-full transition-all duration-200 shadow-md ${
                              isProcessing
                                ? "bg-gray-200 cursor-not-allowed"
                                : "bg-white/90 hover:bg-white cursor-pointer hover:scale-110"
                            }`}
                            title={
                              !currentUserId ||
                              currentUserId === "null" ||
                              currentUserId === "undefined"
                                ? "Login to add to wishlist"
                                : isInWishlist
                                ? "Remove from wishlist"
                                : "Add to wishlist"
                            }
                          >
                            {isProcessing ? (
                              <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-orange-500"></div>
                            ) : (
                              <svg
                                className={`h-6 w-6 transition-colors duration-200 ${
                                  isInWishlist &&
                                  currentUserId &&
                                  currentUserId !== "null" &&
                                  currentUserId !== "undefined"
                                    ? "text-pink-500 fill-pink-500"
                                    : "text-gray-500 hover:text-pink-500"
                                }`}
                                fill={
                                  isInWishlist &&
                                  currentUserId &&
                                  currentUserId !== "null" &&
                                  currentUserId !== "undefined"
                                    ? "currentColor"
                                    : "none"
                                }
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                />
                              </svg>
                            )}
                          </button>

                          <Link href={`/products/${product.slug}`}>
                            <div className="aspect-square relative overflow-hidden rounded-t-lg">
                              <Image
                                src={product.thumbnail}
                                alt={product.name}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                style={{ objectFit: "cover" }}
                                className="hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                          </Link>

                          <div className="p-4">
                            <Link href={`/products/${product.slug}`}>
                              <h3 className="font-medium text-gray-900 text-sm hover:text-orange-500 transition-colors duration-200 mb-2">
                                {product.name}
                              </h3>
                            </Link>

                            <div className="text-lg font-bold text-gray-900">
                              ${product.price}
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-1 mt-3">
                              {product.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </InfiniteScroll>
              </div>
            ) : (
              /* No Products Message */
              <div className="text-center py-12">
                <div className="text-6xl text-gray-300 mb-4">🔍</div>
                <p className="text-gray-500 text-lg mb-4">
                  {searchQuery.trim()
                    ? `No products found matching "${searchQuery}".`
                    : "No products found matching your criteria."}
                </p>
                {(searchQuery.trim() || selectedTags.length > 0) && (
                  <button
                    onClick={handleClearFilters}
                    className="px-6 py-2 text-orange-500 hover:text-orange-600 font-medium border border-orange-500 hover:border-orange-600 rounded-lg transition-colors duration-200"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
