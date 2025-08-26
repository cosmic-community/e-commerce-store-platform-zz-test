import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Discover Amazing Products
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-100">
            From cutting-edge electronics to beautiful home & garden essentials, 
            find everything you need at unbeatable prices.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/products" 
              className="btn-primary bg-white text-primary-600 hover:bg-gray-100 inline-flex items-center justify-center"
            >
              Shop All Products
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link 
              href="/collections" 
              className="btn-secondary bg-primary-500 text-white border-primary-400 hover:bg-primary-400 inline-flex items-center justify-center"
            >
              Browse Collections
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}