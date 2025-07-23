import { database } from "@/db/config/mongodb";
import { ObjectId } from "mongodb";

class WishlistModel {
  static collection() {
    return database.collection("wishlists");
  }

  static async createWishlist({
    productId,
    userId,
  }: {
    productId: string;
    userId: string;
  }) {
    await this.collection().insertOne({
      productId: new ObjectId(productId),
      userId: new ObjectId(userId),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return "Success add wishlist";
  }

  static async deleteWishlist({
    productId,
    userId,
  }: {
    productId: string;
    userId: string;
  }) {
    const wishlist = await this.collection().findOne({
      productId: new ObjectId(productId),
      userId: new ObjectId(userId),
    });

    if (!wishlist) {
      throw { message: "Wishlist not found", status: 404 };
    }

    await this.collection().deleteOne({
      productId: new ObjectId(productId),
      userId: new ObjectId(userId),
    });

    return "Success delete wishlist";
  }

  static async getWishlistByUserId(userId: string) {
    const wishlists = await this.collection()
      .aggregate([
        {
          $match: { userId: new ObjectId(userId) },
        },
        {
          $lookup: {
            from: "products",
            localField: "productId",
            foreignField: "_id",
            as: "products",
          },
        },
        {
          $project: {
            "products.images": 0,
            "products.productLink": 0,
          },
        },
      ])
      .toArray();

    return wishlists;
  }
}

export default WishlistModel;
