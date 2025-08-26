import { createBucketClient } from '@cosmicjs/sdk';
import type { Product, Collection, Review, CosmicResponse } from '@/types';

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
});

// Simple error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Fetch all products with collections
export async function getProducts(): Promise<Product[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'products' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    const products = response.objects as Product[];
    
    // Manual sorting by featured status and then by name
    return products.sort((a, b) => {
      // Featured products first
      if (a.metadata?.featured && !b.metadata?.featured) return -1;
      if (!a.metadata?.featured && b.metadata?.featured) return 1;
      
      // Then alphabetically by name
      const nameA = a.metadata?.name || a.title || '';
      const nameB = b.metadata?.name || b.title || '';
      return nameA.localeCompare(nameB);
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch products');
  }
}

// Fetch single product by slug
export async function getProduct(slug: string): Promise<Product | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'products', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    const product = response.object as Product;
    
    // Always validate critical properties exist
    if (!product || !product.metadata) {
      return null;
    }
    
    return product;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw error;
  }
}

// Fetch all collections
export async function getCollections(): Promise<Collection[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'collections' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    const collections = response.objects as Collection[];
    
    // Sort by featured status and then by name
    return collections.sort((a, b) => {
      if (a.metadata?.featured && !b.metadata?.featured) return -1;
      if (!a.metadata?.featured && b.metadata?.featured) return 1;
      
      const nameA = a.metadata?.name || a.title || '';
      const nameB = b.metadata?.name || b.title || '';
      return nameA.localeCompare(nameB);
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch collections');
  }
}

// Fetch collection by slug
export async function getCollection(slug: string): Promise<Collection | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'collections', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.object as Collection;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw error;
  }
}

// Fetch products by collection
export async function getProductsByCollection(collectionId: string): Promise<Product[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'products',
        'metadata.collections': [collectionId]
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as Product[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch products by collection');
  }
}

// Fetch reviews for a product
export async function getProductReviews(productId: string): Promise<Review[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'reviews',
        'metadata.product': productId
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    const reviews = response.objects as Review[];
    
    // Sort by rating (5 stars first) and then by creation date
    return reviews.sort((a, b) => {
      const ratingA = parseInt(a.metadata?.rating?.key || '0');
      const ratingB = parseInt(b.metadata?.rating?.key || '0');
      
      if (ratingA !== ratingB) {
        return ratingB - ratingA; // Higher ratings first
      }
      
      // If ratings are equal, sort by date (newer first)
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch product reviews');
  }
}

// Fetch all reviews
export async function getReviews(): Promise<Review[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'reviews' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    const reviews = response.objects as Review[];
    
    // Sort by rating and then by date
    return reviews.sort((a, b) => {
      const ratingA = parseInt(a.metadata?.rating?.key || '0');
      const ratingB = parseInt(b.metadata?.rating?.key || '0');
      
      if (ratingA !== ratingB) {
        return ratingB - ratingA;
      }
      
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch reviews');
  }
}

// Get featured products
export async function getFeaturedProducts(): Promise<Product[]> {
  const products = await getProducts();
  return products.filter(product => product.metadata?.featured);
}