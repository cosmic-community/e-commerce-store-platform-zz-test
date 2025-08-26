import { getProducts, getCollections, getFeaturedProducts } from '@/lib/cosmic'
import HeroSection from '@/components/HeroSection'
import ProductGrid from '@/components/ProductGrid'
import CollectionGrid from '@/components/CollectionGrid'
import FeaturedProducts from '@/components/FeaturedProducts'

export default async function HomePage() {
  // Fetch data in parallel for better performance
  const [products, collections, featuredProducts] = await Promise.all([
    getProducts(),
    getCollections(),
    getFeaturedProducts()
  ])

  return (
    <div className="space-y-12">
      <HeroSection />
      
      {featuredProducts.length > 0 && (
        <section className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-center mb-4">Featured Products</h2>
            <p className="text-gray-600 text-center max-w-2xl mx-auto">
              Discover our handpicked selection of premium products that our customers love most.
            </p>
          </div>
          <FeaturedProducts products={featuredProducts} />
        </section>
      )}
      
      {collections.length > 0 && (
        <section className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-center mb-4">Shop by Category</h2>
            <p className="text-gray-600 text-center max-w-2xl mx-auto">
              Explore our carefully curated collections of products for every need.
            </p>
          </div>
          <CollectionGrid collections={collections} />
        </section>
      )}
      
      {products.length > 0 && (
        <section className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-center mb-4">All Products</h2>
            <p className="text-gray-600 text-center max-w-2xl mx-auto">
              Browse our complete selection of quality products at great prices.
            </p>
          </div>
          <ProductGrid products={products} />
        </section>
      )}
    </div>
  )
}