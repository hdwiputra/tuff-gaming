export type ProductType = {
  _id: string;
  name: string;
  slug: string;
  price: number;
  thumbnail: string;
  images?: string[];
  description: string;
  excerpt: string;
  tags: string[];
  wishlists: { userId: string }[];
  isWishlisted?: boolean;
};

export type Achievement = {
  id: string;
  icon: React.ReactNode;
  stat: string;
  description: string;
};

export type FeatureSlide = {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
};

export type ComparisonSpec = {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
};

export type ComparisonModel = {
  id: string;
  name: string;
  subtitle: string;
  image: string;
  specs: ComparisonSpec[];
};

export type ProductGridProps = {
  products: ProductType[];
};

export type Collection = {
  id: string;
  name: string;
  image: string;
  description: string;
};

export type Controller = {
  id: string;
  name: string;
  image: string;
  platform: string;
};

export type Testimonial = {
  id: string;
  name: string;
  represent: string;
  rating: number;
  review: string;
};

export type Feature = {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
};

export type Product = {
  _id: string;
  name: string;
  slug: string;
  price: number;
  thumbnail: string;
  releaseDate: Date;
  tags: string[];
  excerpt: string;
};

export interface WishlistItem {
  _id: string;
  userId: string;
  productId: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  products: Product[]; // Array of products from $lookup
}

export interface WishlistContentProps {
  wishlistItems: WishlistItem[];
  currentUserId?: string | null;
}

export type ProductQueryParams = {
  page?: number;
  limit?: number;
  search?: string;
  tags?: string[];
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};

export type PaginatedResult<T> = {
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    hasNext: boolean;
    hasPrev: boolean;
    limit: number;
  };
};

export type NewUserType = {
  username: string;
  name: string;
  email: string;
  password: string;
};

export type User = {
  email: string;
  password: string;
};

export type NewWishlistType = {
  userId: string;
  productId: string;
};

export interface ProductDetailProps {
  product: ProductType;
  currentUserId?: string | null;
}

export interface AddWishlistButtonProps {
  product: ProductType;
  currentUserId?: string | null;
}

// Wishlist item interface (excluding projected fields)
export interface WishlistItem {
  userId: string;
  // Add other wishlist fields you need, excluding the projected ones:
  // productId, _id, createdAt, updatedAt are excluded by projection
}

// Product result interface after aggregation
export interface ProductResult {
  _id: string;
  slug: string;
  name: string;
  price: number;
  description?: string;
  wishlists: WishlistItem[];
  isWishlisted: boolean;
}

// Aggregation pipeline stage types
export interface MatchStage {
  $match: { slug: string };
}

export interface LookupStage {
  $lookup: {
    from: string;
    localField: string;
    foreignField: string;
    as: string;
  };
}

export interface ProjectStage {
  $project: {
    productLink: 0;
    "wishlists.productId": 0;
    "wishlists._id": 0;
    "wishlists.createdAt": 0;
    "wishlists.updatedAt": 0;
  };
}

// Union type for all pipeline stages
export type PipelineStage = MatchStage | LookupStage | ProjectStage;
