import Link from 'next/link'
import type { Product } from '@/types'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const name = product.metadata?.name || product.title
  const price = product.metadata?.price
  const salePrice = product.metadata?.sale_price
  const image = product.metadata?.images?.[0]
  const featured = product.metadata?.featured

  return (
    <div className="card group hover:shadow-lg transition-shadow duration-300">
      <Link href={`/products/${product.slug}`}>
        <div className="relative">
          {image ? (
            <img
              src={`${image.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`}
              alt={name}
              width={300}
              height={200}
              className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-48 bg-gray-200 rounded-t-lg flex items-center justify-center">
              <span className="text-4xl">📦</span>
            </div>
          )}
          
          {featured && (
            <div className="absolute top-2 left-2 bg-primary-600 text-white text-xs px-2 py-1 rounded-md font-medium">
              Featured
            </div>
          )}
          
          {salePrice && price && salePrice < price && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-md font-medium">
              Sale
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
            {name}
          </h3>
          
          <div className="flex items-center gap-2 mb-2">
            {salePrice && price && salePrice < price ? (
              <>
                <span className="text-lg font-bold text-red-600">
                  ${salePrice.toFixed(2)}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  ${price.toFixed(2)}
                </span>
              </>
            ) : (
              price && (
                <span className="text-lg font-bold text-gray-900">
                  ${price.toFixed(2)}
                </span>
              )
            )}
          </div>
          
          {product.metadata?.collections && product.metadata.collections.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {product.metadata.collections.slice(0, 2).map((collection) => (
                <span 
                  key={collection.id}
                  className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md"
                >
                  {collection.metadata?.name || collection.title}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </div>
  )
}