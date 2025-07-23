"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WishlistContent } from "../../components/sections/wishlist-content";
import { useEffect, useState } from "react";
import Loading from "@/app/loading";
import { WishlistItem } from "@/types";

// Define the API response type
type WishlistApiResponse = {
  wishlists: WishlistItem[];
};

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        setLoading(true);

        const response = await fetch("/api/wishlist", {
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("Please log in to view your wishlist");
          }
          throw new Error(`Failed to fetch wishlist: ${response.status}`);
        }

        const result: WishlistApiResponse = await response.json();
        setWishlistItems(result.wishlists);
        setError(null);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
        setError(error instanceof Error ? error.message : "An error occurred");
        setWishlistItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {error && (
        <div className="container mx-auto px-4 py-2">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            Error: {error}
          </div>
        </div>
      )}
      <WishlistContent wishlistItems={wishlistItems} />
      <Footer />
    </div>
  );
}
