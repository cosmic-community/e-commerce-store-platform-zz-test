// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Product interface with complete metadata structure
export interface Product extends CosmicObject {
  type: 'products';
  metadata: {
    name: string;
    description: string;
    price: number;
    sale_price?: number;
    sku?: string;
    stock_quantity?: number;
    images?: {
      url: string;
      imgix_url: string;
    }[];
    featured?: boolean;
    collections?: Collection[];
  };
}

// Collection interface
export interface Collection extends CosmicObject {
  type: 'collections';
  metadata: {
    name: string;
    description?: string;
    image?: {
      url: string;
      imgix_url: string;
    };
    featured?: boolean;
  };
}

// Review interface with rating structure
export interface Review extends CosmicObject {
  type: 'reviews';
  metadata: {
    rating: {
      key: string;
      value: string;
    };
    title: string;
    comment: string;
    reviewer_name: string;
    reviewer_email?: string;
    product: Product;
    verified_purchase?: boolean;
  };
}

// Type literals for select-dropdown values (matching content model exactly)
export type RatingKey = '1' | '2' | '3' | '4' | '5';
export type RatingValue = '1 Star' | '2 Stars' | '3 Stars' | '4 Stars' | '5 Stars';

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit?: number;
  skip?: number;
}

// Type guards for runtime validation
export function isProduct(obj: CosmicObject): obj is Product {
  return obj.type === 'products';
}

export function isCollection(obj: CosmicObject): obj is Collection {
  return obj.type === 'collections';
}

export function isReview(obj: CosmicObject): obj is Review {
  return obj.type === 'reviews';
}

// Utility types
export type CreateProductData = Omit<Product, 'id' | 'created_at' | 'modified_at'>;
export type CreateReviewData = Omit<Review, 'id' | 'created_at' | 'modified_at'>;