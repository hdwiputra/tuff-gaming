import WishlistModel from "@/db/models/WishlistModel";
import { errorHandler } from "@/helpers/errorHandler";

export async function POST(req: Request) {
  try {
    const { productId } = await req.json();
    const userId = req.headers.get("x-userId");

    if (!userId) {
      throw { message: "User ID is required", status: 400 };
    }

    const newWishlist = { productId, userId };
    const result = await WishlistModel.createWishlist(newWishlist);
    return new Response(JSON.stringify({ message: result }));
  } catch (error) {
    return errorHandler(error);
  }
}

export async function DELETE(req: Request) {
  try {
    const { productId } = await req.json();
    const userId = req.headers.get("x-userId");

    if (!userId) {
      throw { message: "User ID is required", status: 400 };
    }

    const wishlist = { productId, userId };
    const result = await WishlistModel.deleteWishlist(wishlist);
    return new Response(JSON.stringify({ message: result }));
  } catch (error) {
    return errorHandler(error);
  }
}

export async function GET(req: Request) {
  try {
    const currentUserId = req.headers.get("x-userId");

    if (!currentUserId) {
      throw { message: "User ID is required", status: 400 };
    }

    const wishlists = await WishlistModel.getWishlistByUserId(currentUserId);

    return new Response(JSON.stringify({ wishlists }));
  } catch (error) {
    return errorHandler(error);
  }
}
