import ProductModel from "@/db/models/ProductModel";
import { ProductType } from "@/types";
import { NextRequest } from "next/server";

// Define API response type
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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Extract query parameters
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");
    const search = searchParams.get("search") || "";
    const sortBy = searchParams.get("sortBy") || "position";
    const sortOrder =
      (searchParams.get("sortOrder") as "asc" | "desc") || "asc";

    // Handle tags parameter (can be comma-separated)
    const tagsParam = searchParams.get("tags");
    const tags = tagsParam
      ? tagsParam.split(",").filter((tag) => tag.trim())
      : [];

    // Get userId from middleware (will be null if not logged in)
    const currentUserId = request.headers.get("x-userId");

    // Get paginated products
    const result = await ProductModel.getProducts({
      page,
      limit,
      search,
      tags,
      sortBy,
      sortOrder,
    });

    // Transform raw MongoDB documents into ProductType objects
    const transformedData: ProductType[] = result.data.map((doc) => ({
      _id: doc._id.toString(),
      name: doc.name,
      slug: doc.slug,
      price: doc.price,
      description: doc.description,
      images: doc.images,
      tags: doc.tags,
      stock: doc.stock,
      thumbnail: doc.thumbnail || "", // Default to empty string if not present
      excerpt: doc.excerpt || "", // Default to empty string if not present
      wishlists: doc.wishlists || [], // Default to empty array if not present
      isWishlisted: false, // Default value, updated later
    }));

    // Set isWishlisted for each product based on current user
    const updatedData = transformedData.map((product) => {
      if (currentUserId && product.wishlists) {
        product.isWishlisted = product.wishlists.some(
          (wishlist: { userId: string }) =>
            wishlist.userId.toString() === currentUserId
        );
      }
      return product;
    });

    // Build response
    const response: ApiResponse = {
      data: updatedData,
      pagination: result.pagination,
      currentUserId,
    };

    return Response.json(response);
  } catch (error) {
    console.error("Error fetching products:", error);
    return Response.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
