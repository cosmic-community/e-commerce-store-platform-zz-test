# E-Commerce Store Platform

![E-Commerce Store Platform](https://imgix.cosmicjs.com/12bcff60-8261-11f0-a561-cd0208bbad0c-photo-1498049794561-7780e7231661-1756201388102.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern, full-featured e-commerce platform built with Next.js that showcases your product catalog with dynamic collections and customer reviews. Features responsive design, image galleries, and comprehensive review system.

## ✨ Features

- **Product Catalog**: Dynamic product display with detailed information and pricing
- **Collections System**: Organized product categories (Electronics, Home & Garden)
- **Customer Reviews**: Full review system with star ratings and verified purchases
- **Image Galleries**: Multiple product images with optimized imgix loading
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **SEO Optimized**: Proper meta tags and structured data for search engines
- **Performance**: Optimized images and efficient data fetching

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=68ad80071f09167261d58d7e&clone_repository=68ad84031f09167261d58da4)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Design a content model for an e-commerce store with products, collections, and customer reviews"

### Code Generation Prompt

> Build a Next.js website that uses my existing objects in this bucket

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠️ Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Cosmic** - Headless CMS for content management
- **imgix** - Image optimization and delivery

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account with your bucket set up

### Installation

1. Clone the repository
2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:
```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:
```bash
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) to view the site

## 📚 Cosmic SDK Examples

### Fetch Products with Collections
```javascript
const response = await cosmic.objects
  .find({ type: 'products' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1);
```

### Get Product Reviews
```javascript
const reviews = await cosmic.objects
  .find({ 
    type: 'reviews',
    'metadata.product': productId 
  })
  .depth(1);
```

## 🌟 Cosmic CMS Integration

This application leverages your Cosmic bucket structure:

- **Products**: Complete product catalog with names, descriptions, pricing, images, and collection assignments
- **Collections**: Product categories for organization and filtering
- **Reviews**: Customer feedback system with ratings, comments, and verified purchase status

The content model supports rich product information including multiple images, pricing (with sale prices), inventory tracking, and detailed HTML descriptions.

## 🚀 Deployment Options

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Add environment variables in the Vercel dashboard
3. Deploy automatically on every push

### Netlify
1. Connect your repository to Netlify
2. Set build command: `bun run build`
3. Set publish directory: `out` or `.next`
4. Add environment variables in site settings

### Other Platforms
This Next.js application can be deployed to any platform that supports Node.js applications.

---

Built with ❤️ using [Cosmic](https://www.cosmicjs.com/docs)
<!-- README_END -->