// app/products/[slug]/page.tsx
import { getProduct, getProductReviews } from '@/lib/cosmic'
import ProductDetail from '@/components/ProductDetail'
import ReviewSection from '@/components/ReviewSection'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  // IMPORTANT: In Next.js 15+, params are now Promises and MUST be awaited
  const { slug } = await params
  const product = await getProduct(slug)
  
  if (!product) {
    return {
      title: 'Product Not Found'
    }
  }
  
  const productName = product.metadata?.name || product.title
  const description = product.metadata?.description ? 
    product.metadata.description.replace(/<[^>]*>/g, '').substring(0, 160) :
    `Shop ${productName} at great prices`
  
  return {
    title: `${productName} - E-Commerce Store Platform`,
    description,
    openGraph: {
      title: productName,
      description,
      images: product.metadata?.images?.[0]?.imgix_url ? [
        {
          url: `${product.metadata.images[0].imgix_url}?w=1200&h=630&fit=crop&auto=format,compress`,
          width: 1200,
          height: 630,
          alt: productName,
        }
      ] : [],
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  // IMPORTANT: In Next.js 15+, params are now Promises and MUST be awaited
  const { slug } = await params
  
  const [product, reviews] = await Promise.all([
    getProduct(slug),
    getProduct(slug).then(p => p ? getProductReviews(p.id) : [])
  ])
  
  if (!product) {
    notFound()
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <ProductDetail product={product} />
      
      <div className="mt-12">
        <ReviewSection reviews={reviews} productName={product.metadata?.name || product.title} />
      </div>
    </div>
  )
}