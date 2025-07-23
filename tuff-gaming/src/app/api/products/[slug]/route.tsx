import { errorHandler } from "@/helpers/errorHandler";

// Lazy import to avoid database connection during build
const getProductModel = async () => {
  const { default: ProductModel } = await import("@/db/models/ProductModel");
  return ProductModel;
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // Validate slug
    if (!slug || typeof slug !== "string") {
      return Response.json(
        { message: "Invalid slug parameter" },
        { status: 400 }
      );
    }

    const currentUserId = request.headers.get("x-userId");

    // Lazy load ProductModel to avoid build-time database connection
    const ProductModel = await getProductModel();

    // Get product with populated wishlists
    const product = await ProductModel.getProductBySlug(slug);

    if (!product) {
      return Response.json({ message: "Product Not Found" }, { status: 404 });
    }

    // Set isWishlisted based on current user
    product.isWishlisted = false;
    if (
      currentUserId &&
      product.wishlists &&
      Array.isArray(product.wishlists)
    ) {
      product.isWishlisted = product.wishlists.some(
        (wishlist: { userId: string }) =>
          wishlist.userId?.toString() === currentUserId
      );
    }

    return Response.json(product);
  } catch (error) {
    console.error("API Error:", error);
    return errorHandler(error);
  }
}
