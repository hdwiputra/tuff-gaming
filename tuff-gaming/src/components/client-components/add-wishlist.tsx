"use client";

import { useState, useMemo } from "react";
import { showToast } from "@/components/layout/toastProvider"; // Adjust path as needed
import type { AddWishlistButtonProps } from "@/types";
import { useRouter } from "next/navigation";

export function AddWishlistButton({
  product,
  currentUserId,
}: AddWishlistButtonProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [optimisticWishlistState, setOptimisticWishlistState] = useState<
    boolean | null
  >(null);
  const router = useRouter();

  // Use backend's isWishlisted property with optimistic updates
  const isInWishlist = useMemo(() => {
    // Use optimistic state if available, otherwise use backend data
    if (optimisticWishlistState !== null) {
      return optimisticWishlistState;
    }

    // Use the backend's isWishlisted property
    return product.isWishlisted || false;
  }, [product.isWishlisted, optimisticWishlistState]);

  const handleWishlist = async () => {
    if (
      !currentUserId ||
      currentUserId === "null" ||
      currentUserId === "undefined"
    ) {
      showToast.wishlist.loginRequired();
      router.push("/login");
      return;
    }

    if (isProcessing) return;
    setIsProcessing(true);

    // Optimistically update the UI
    const newWishlistState = !isInWishlist;
    setOptimisticWishlistState(newWishlistState);

    try {
      if (isInWishlist) {
        await handleRemoveWishlist();
      } else {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlist`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ productId: product._id }),
            credentials: "include",
          }
        );

        if (res.ok) {
          showToast.wishlist.added(product.name);
        } else {
          setOptimisticWishlistState(null);
          const errorData = await res.json().catch(() => ({}));
          throw new Error(
            errorData.message || `Server error: ${res.status} ${res.statusText}`
          );
        }
      }
    } catch (error) {
      console.error("Error managing wishlist:", error);
      setOptimisticWishlistState(null);

      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";

      if (isInWishlist) {
        showToast.error(`Failed to remove from wishlist: ${errorMessage}`);
      } else {
        showToast.error(`Failed to add to wishlist: ${errorMessage}`);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRemoveWishlist = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlist`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId: product._id }),
          credentials: "include",
        }
      );

      if (res.ok) {
        showToast.wishlist.removed(product.name);
      } else {
        setOptimisticWishlistState(null);
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
    <button
      onClick={handleWishlist}
      disabled={isProcessing}
      className={`w-full font-semibold py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 ${
        isProcessing
          ? "bg-gray-300 cursor-not-allowed"
          : isInWishlist
          ? "bg-pink-500 hover:bg-pink-600 text-white"
          : "border-2 border-orange-500 text-black hover:bg-orange-50"
      }`}
      title={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
    >
      {isProcessing ? (
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600"></div>
      ) : (
        <svg
          className={`w-5 h-5 transition-colors duration-200 ${
            isInWishlist ? "fill-current" : "fill-none"
          }`}
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
      {isInWishlist ? "REMOVE FROM WISHLIST" : "ADD TO WISHLIST"}
    </button>
  );
}
