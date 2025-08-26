import { getCollections } from '@/lib/cosmic'
import CollectionGrid from '@/components/CollectionGrid'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Collections - E-Commerce Store Platform',
  description: 'Browse our product collections including Electronics, Home & Garden, and more categories.',
}

export default async function CollectionsPage() {
  const collections = await getCollections()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Product Collections</h1>
        <p className="text-gray-600 text-lg">
          Explore our carefully organized product categories to find exactly what you're looking for.
        </p>
      </div>
      
      {collections.length > 0 ? (
        <CollectionGrid collections={collections} />
      ) : (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4">No collections found</h2>
          <p className="text-gray-600">
            We're organizing our products into collections. Check back soon!
          </p>
        </div>
      )}
    </div>
  )
}