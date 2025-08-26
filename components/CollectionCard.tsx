import Link from 'next/link'
import type { Collection } from '@/types'

interface CollectionCardProps {
  collection: Collection
}

export default function CollectionCard({ collection }: CollectionCardProps) {
  const name = collection.metadata?.name || collection.title
  const description = collection.metadata?.description
  const image = collection.metadata?.image
  const featured = collection.metadata?.featured

  return (
    <div className="card group hover:shadow-xl transition-all duration-300">
      <Link href={`/collections/${collection.slug}`}>
        <div className="relative">
          {image ? (
            <img
              src={`${image.imgix_url}?w=800&h=400&fit=crop&auto=format,compress`}
              alt={name}
              width={400}
              height={200}
              className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-48 bg-gradient-to-br from-primary-500 to-primary-600 rounded-t-lg flex items-center justify-center">
              <span className="text-4xl">📂</span>
            </div>
          )}
          
          {featured && (
            <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-md font-medium">
              Featured
            </div>
          )}
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
            {name}
          </h3>
          
          {description && (
            <p className="text-gray-600 mb-4 line-clamp-3">
              {description}
            </p>
          )}
          
          <div className="flex items-center text-primary-600 font-medium">
            <span>Explore Collection</span>
            <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </Link>
    </div>
  )
}