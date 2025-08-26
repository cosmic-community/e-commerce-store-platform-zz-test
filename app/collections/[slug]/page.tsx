// app/collections/[slug]/page.tsx
import { getCollection, getProductsByCollection } from '@/lib/cosmic'
import ProductGrid from '@/components/ProductGrid'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

interface CollectionPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  // IMPORTANT: In Next.js 15+, params are now Promises and MUST be awaited
  const { slug } = await params
  const collection = await getCollection(slug)
  
  if (!collection) {
    return {
      title: 'Collection Not Found'
    }
  }
  
  const collectionName = collection.metadata?.name || collection.title
  const description = collection.metadata?.description || `Shop ${collectionName} products`
  
  return {
    title: `${collectionName} - E-Commerce Store Platform`,
    description,
    openGraph: {
      title: collectionName,
      description,
      images: collection.metadata?.image?.imgix_url ? [
        {
          url: `${collection.metadata.image.imgix_url}?w=1200&h=630&fit=crop&auto=format,compress`,
          width: 1200,
          height: 630,
          alt: collectionName,
        }
      ] : [],
    },
  }
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  // IMPORTANT: In Next.js 15+, params are now Promises and MUST be awaited
  const { slug } = await params
  
  const [collection, products] = await Promise.all([
    getCollection(slug),
    getCollection(slug).then(c => c ? getProductsByCollection(c.id) : [])
  ])
  
  if (!collection) {
    notFound()
  }
  
  const collectionName = collection.metadata?.name || collection.title
  const description = collection.metadata?.description
  const image = collection.metadata?.image
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        {image && (
          <div className="mb-6 rounded-lg overflow-hidden">
            <img
              src={`${image.imgix_url}?w=1200&h=300&fit=crop&auto=format,compress`}
              alt={collectionName}
              width={1200}
              height={300}
              className="w-full h-60 object-cover"
            />
          </div>
        )}
        
        <h1 className="text-4xl font-bold mb-4">{collectionName}</h1>
        {description && (
          <p className="text-gray-600 text-lg">{description}</p>
        )}
        <p className="text-sm text-gray-500 mt-2">
          {products.length} {products.length === 1 ? 'product' : 'products'} in this collection
        </p>
      </div>
      
      {products.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4">No products found</h2>
          <p className="text-gray-600">
            This collection is being updated with new products. Check back soon!
          </p>
        </div>
      )}
    </div>
  )
}