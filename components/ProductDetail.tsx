import type { Product } from '@/types'

interface ProductDetailProps {
  product: Product
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const name = product.metadata?.name || product.title
  const description = product.metadata?.description
  const price = product.metadata?.price
  const salePrice = product.metadata?.sale_price
  const sku = product.metadata?.sku
  const stock = product.metadata?.stock_quantity
  const images = product.metadata?.images || []
  const collections = product.metadata?.collections || []

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Product Images */}
      <div className="space-y-4">
        {images.length > 0 ? (
          <>
            <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
              <img
                src={`${images[0].imgix_url}?w=800&h=800&fit=crop&auto=format,compress`}
                alt={name}
                width={800}
                height={800}
                className="w-full h-full object-cover"
              />
            </div>
            
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {images.slice(1, 5).map((image, index) => (
                  <div key={index} className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src={`${image.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
                      alt={`${name} - Image ${index + 2}`}
                      width={200}
                      height={200}
                      className="w-full h-full object-cover cursor-pointer hover:opacity-75 transition-opacity"
                    />
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="aspect-square rounded-lg bg-gray-200 flex items-center justify-center">
            <span className="text-6xl">📦</span>
          </div>
        )}
      </div>
      
      {/* Product Information */}
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{name}</h1>
          
          {collections.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {collections.map((collection) => (
                <span 
                  key={collection.id}
                  className="text-sm bg-primary-100 text-primary-800 px-3 py-1 rounded-full"
                >
                  {collection.metadata?.name || collection.title}
                </span>
              ))}
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          {salePrice && price && salePrice < price ? (
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-red-600">
                ${salePrice.toFixed(2)}
              </span>
              <span className="text-xl text-gray-500 line-through">
                ${price.toFixed(2)}
              </span>
              <span className="bg-red-500 text-white text-sm px-2 py-1 rounded-md">
                Save ${(price - salePrice).toFixed(2)}
              </span>
            </div>
          ) : (
            price && (
              <span className="text-3xl font-bold text-gray-900">
                ${price.toFixed(2)}
              </span>
            )
          )}
          
          {sku && (
            <p className="text-sm text-gray-600">SKU: {sku}</p>
          )}
          
          {stock !== undefined && (
            <p className={`text-sm font-medium ${stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {stock > 0 ? `${stock} in stock` : 'Out of stock'}
            </p>
          )}
        </div>
        
        {description && (
          <div className="prose prose-gray max-w-none">
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <div dangerouslySetInnerHTML={{ __html: description }} />
          </div>
        )}
        
        <div className="space-y-4">
          <button 
            className="w-full btn-primary py-3 text-lg"
            disabled={stock === 0}
          >
            {stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
          
          <button className="w-full btn-secondary py-3 text-lg">
            Add to Wishlist
          </button>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Product Features</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Free shipping on orders over $50</li>
            <li>• 30-day return policy</li>
            <li>• 1-year manufacturer warranty</li>
            <li>• Customer service support</li>
          </ul>
        </div>
      </div>
    </div>
  )
}