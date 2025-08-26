import CollectionCard from '@/components/CollectionCard'
import type { Collection } from '@/types'

interface CollectionGridProps {
  collections: Collection[]
}

export default function CollectionGrid({ collections }: CollectionGridProps) {
  if (!collections || collections.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold mb-2">No collections found</h3>
        <p className="text-gray-600">Check back later for new collections.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {collections.map((collection) => (
        <CollectionCard key={collection.id} collection={collection} />
      ))}
    </div>
  )
}