import { database } from "../config/mongodb";
import {
  ProductQueryParams,
  PaginatedResult,
  ProductResult,
  PipelineStage,
} from "@/types";
import { Document, Filter, Sort } from "mongodb";

class ProductModel {
  static collection() {
    return database.collection("products");
  }

  static async getAll() {
    return await this.collection().find().toArray();
  }

  static async getHomeProduct() {
    return await this.collection().find().skip(4).limit(4).toArray();
  }

  static async getProductBySlug(slug: string): Promise<ProductResult | null> {
    // Use proper typing for the aggregation pipeline
    const pipeline: PipelineStage[] = [
      { $match: { slug } },
      {
        $lookup: {
          from: "wishlists",
          localField: "_id",
          foreignField: "productId",
          as: "wishlists",
        },
      },
      {
        $project: {
          productLink: 0,
          "wishlists.productId": 0,
          "wishlists._id": 0,
          "wishlists.createdAt": 0,
          "wishlists.updatedAt": 0,
        },
      },
    ];

    const result = await this.collection()
      .aggregate<ProductResult>(pipeline)
      .toArray();
    return result[0] || null;
  }

  // New method for paginated, searchable, and sortable products
  static async getProducts(
    params: ProductQueryParams = {}
  ): Promise<PaginatedResult<Document>> {
    const {
      page = 1,
      limit = 12,
      search = "",
      tags = [],
      sortBy = "position",
      sortOrder = "asc",
    } = params;

    // Build the MongoDB filter object
    const matchStage: Filter<Document> = {};

    // Add search filter (case-insensitive search on name and tags)
    if (search.trim()) {
      matchStage.$or = [
        { name: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } },
      ];
    }

    // Add tags filter
    if (tags.length > 0) {
      matchStage.tags = { $in: tags };
    }

    // Build the sort object
    const sort: Sort = (() => {
      switch (sortBy) {
        case "price-low-high":
          return { price: 1 } as Sort;
        case "price-high-low":
          return { price: -1 } as Sort;
        case "name-a-z":
          return { name: 1 } as Sort;
        case "name-z-a":
          return { name: -1 } as Sort;
        case "position":
        default:
          return { _id: sortOrder === "desc" ? -1 : 1 } as Sort;
      }
    })();

    // Calculate pagination
    const skip = (page - 1) * limit;

    try {
      // Build aggregation pipeline
      const pipeline: Document[] = [];

      // Add match stage if there are filters
      if (Object.keys(matchStage).length > 0) {
        pipeline.push({ $match: matchStage });
      }

      // Add your lookup and project stages
      pipeline.push(
        {
          $lookup: {
            from: "wishlists",
            localField: "_id",
            foreignField: "productId",
            as: "wishlists",
          },
        },
        {
          $project: {
            images: 0,
            productLink: 0,
            "wishlists.productId": 0,
            "wishlists._id": 0,
            "wishlists.createdAt": 0,
            "wishlists.updatedAt": 0,
          },
        }
      );

      // Add sort stage
      pipeline.push({ $sort: sort });

      // Get total count with a separate aggregation (before skip/limit)
      const countPipeline = [...pipeline];
      countPipeline.push({ $count: "totalItems" });

      const countResult = await this.collection()
        .aggregate(countPipeline)
        .toArray();
      const totalItems = countResult.length > 0 ? countResult[0].totalItems : 0;

      // Add pagination to main pipeline
      pipeline.push({ $skip: skip }, { $limit: limit });

      // Execute the main aggregation
      const data = await this.collection().aggregate(pipeline).toArray();

      // Calculate pagination info
      const totalPages = Math.ceil(totalItems / limit);
      const hasNext = page < totalPages;
      const hasPrev = page > 1;

      return {
        data,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems,
          hasNext,
          hasPrev,
          limit,
        },
      };
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  }

  // Method to get products with specific tags (for filtering)
  static async getProductsByTags(tags: string[]) {
    return await this.collection()
      .find({ tags: { $in: tags } })
      .toArray();
  }

  // Method to search products by name only
  static async searchByName(searchTerm: string) {
    return await this.collection()
      .find({
        name: { $regex: searchTerm, $options: "i" },
      })
      .toArray();
  }

  // Method to get products in a specific price range
  static async getProductsByPriceRange(minPrice: number, maxPrice: number) {
    return await this.collection()
      .find({
        price: { $gte: minPrice, $lte: maxPrice },
      })
      .toArray();
  }
}

export default ProductModel;
