"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ProductHero } from "@/components/sections/product-hero";
import { ProductGrid } from "@/components/sections/product-grid";
import { ProductType } from "@/types";
import { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Loading from "@/app/loading";

// Define the API response type
type ApiResponse = {
  data: ProductType[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    hasNext: boolean;
    hasPrev: boolean;
    limit: number;
  };
  currentUserId?: string | null;
};

export default function Products() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    hasNext: false,
    hasPrev: false,
    limit: 12,
  });

  // Get initial state from URL
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );
  const [selectedTags, setSelectedTags] = useState<string[]>(
    searchParams.get("tags") ? searchParams.get("tags")!.split(",") : []
  );
  const [sortBy, setSortBy] = useState(
    searchParams.get("sortBy") || "position"
  );
  const [currentPage, setCurrentPage] = useState(1);

  // Function to update URL with current filter state
  const updateURL = (
    newSearchQuery: string,
    newSelectedTags: string[],
    newSortBy: string
  ) => {
    const params = new URLSearchParams();

    // Only add parameters if they have values
    if (newSearchQuery.trim()) {
      params.set("search", newSearchQuery);
    }

    if (newSelectedTags.length > 0) {
      params.set("tags", newSelectedTags.join(","));
    }

    if (newSortBy && newSortBy !== "position") {
      params.set("sortBy", newSortBy);
    }

    // Build the new URL
    const queryString = params.toString();
    const newURL = queryString ? `/products?${queryString}` : "/products";

    // Use router.replace to update URL without adding to history
    router.replace(newURL, { scroll: false });
  };

  // Function to build query parameters for API
  const buildQueryParams = useCallback(
    (page: number = 1) => {
      const params = new URLSearchParams();
      params.append("page", page.toString());
      params.append("limit", "12");

      if (searchQuery.trim()) {
        params.append("search", searchQuery);
      }

      if (selectedTags.length > 0) {
        params.append("tags", selectedTags.join(","));
      }

      if (sortBy) {
        params.append("sortBy", sortBy);
      }

      return params.toString();
    },
    [searchQuery, selectedTags, sortBy]
  );

  // Function to fetch products
  const fetchProducts = useCallback(
    async (page: number = 1, append: boolean = false) => {
      try {
        setLoading(!append); // Only show loading spinner for new searches, not infinite scroll
        const queryParams = buildQueryParams(page);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/products?${queryParams}`,
          {
            credentials: "include", // Include cookies for authentication
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const result: ApiResponse = await res.json();

        if (append) {
          // For infinite scroll - append new products
          setProducts((prev) => [...prev, ...result.data]);
        } else {
          // For new search/filter - replace products
          setProducts(result.data);
        }

        setPagination(result.pagination);
        setCurrentPage(page);

        // Set currentUserId from API response
        if (result.currentUserId !== undefined) {
          setCurrentUserId(result.currentUserId);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    },
    [buildQueryParams]
  );

  // Initial load and URL param changes
  useEffect(() => {
    fetchProducts(1, false);
  }, [fetchProducts]);

  // Function to load more products (for infinite scroll)
  const loadMore = () => {
    if (pagination.hasNext && !loading) {
      fetchProducts(currentPage + 1, true);
    }
  };

  // Handler functions for ProductGrid
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
    updateURL(query, selectedTags, sortBy);
  };

  const handleTagsChange = (tags: string[]) => {
    setSelectedTags(tags);
    setCurrentPage(1);
    updateURL(searchQuery, tags, sortBy);
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
    setCurrentPage(1);
    updateURL(searchQuery, selectedTags, sort);
  };

  // Special handlers for clearing filters
  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedTags([]);
    setCurrentPage(1);
    updateURL("", [], sortBy); // Keep current sortBy but clear search and tags
  };

  const handleClearAll = () => {
    setSearchQuery("");
    setSelectedTags([]);
    setSortBy("position");
    setCurrentPage(1);
    updateURL("", [], "position"); // Clear everything including sort
  };

  // Handle browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const urlSearch = urlParams.get("search") || "";
      const urlTags = urlParams.get("tags")
        ? urlParams.get("tags")!.split(",")
        : [];
      const urlSort = urlParams.get("sortBy") || "position";

      setSearchQuery(urlSearch);
      setSelectedTags(urlTags);
      setSortBy(urlSort);
      setCurrentPage(1);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  if (loading && products.length === 0) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <ProductHero />
        <ProductGrid
          products={products}
          loading={loading}
          pagination={pagination}
          currentUserId={currentUserId}
          onLoadMore={loadMore}
          searchQuery={searchQuery}
          selectedTags={selectedTags}
          sortBy={sortBy}
          onSearchChange={handleSearchChange}
          onTagsChange={handleTagsChange}
          onSortChange={handleSortChange}
          onClearFilters={handleClearFilters}
          onClearAll={handleClearAll}
        />
      </main>

      <Footer />
    </div>
  );
}
