import { getProducts, getCollections } from '@/lib/cosmic'
import ProductGrid from '@/components/ProductGrid'
import ProductFilters from '@/components/ProductFilters'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'All Products - E-Commerce Store Platform',
  description: 'Browse our complete selection of quality products including electronics, home & garden items, and more.',
}

export default async function ProductsPage() {
  const [products, collections] = await Promise.all([
    getProducts(),
    getCollections()
  ])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">All Products</h1>
        <p className="text-gray-600 text-lg">
          Discover our complete range of {products.length} carefully selected products.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <ProductFilters collections={collections} />
        </aside>
        
        <div className="lg:col-span-3">
          {products.length > 0 ? (
            <ProductGrid products={products} />
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold mb-4">No products found</h2>
              <p className="text-gray-600">
                We're working on adding new products. Check back soon!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}