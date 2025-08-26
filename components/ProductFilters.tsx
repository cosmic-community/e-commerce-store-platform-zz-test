'use client'

import Link from 'next/link'
import type { Collection } from '@/types'

interface ProductFiltersProps {
  collections: Collection[]
}

export default function ProductFilters({ collections }: ProductFiltersProps) {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold mb-4">Filter by Category</h3>
      
      <div className="space-y-3">
        <Link 
          href="/products" 
          className="block text-gray-700 hover:text-primary-600 transition-colors"
        >
          All Products
        </Link>
        
        {collections.map((collection) => (
          <Link 
            key={collection.id}
            href={`/collections/${collection.slug}`} 
            className="block text-gray-700 hover:text-primary-600 transition-colors"
          >
            {collection.metadata?.name || collection.title}
          </Link>
        ))}
      </div>
      
      <hr className="my-6" />
      
      <h4 className="font-medium mb-3">Price Range</h4>
      <div className="space-y-2 text-sm">
        <label className="flex items-center">
          <input type="checkbox" className="mr-2" />
          Under $50
        </label>
        <label className="flex items-center">
          <input type="checkbox" className="mr-2" />
          $50 - $100
        </label>
        <label className="flex items-center">
          <input type="checkbox" className="mr-2" />
          $100 - $200
        </label>
        <label className="flex items-center">
          <input type="checkbox" className="mr-2" />
          Over $200
        </label>
      </div>
    </div>
  )
}