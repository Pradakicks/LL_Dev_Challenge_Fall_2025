import { ExternalProduct, ConvertedProduct } from '@/types';

/**
 * API configuration
 */
const API_BASE_URL = 'https://api.escuelajs.co/api/v1';

/**
 * Fetch products from Platzi Fake Store API
 */
export async function fetchProducts(limit: number = 20, offset: number = 0): Promise<ConvertedProduct[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/products?limit=${limit}&offset=${offset}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const products: ExternalProduct[] = await response.json();
    
    // Convert external API format to our internal format
    return products.map(convertProduct);
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products');
  }
}

/**
 * Fetch a single product by ID
 */
export async function fetchProductById(id: number): Promise<ConvertedProduct> {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const product: ExternalProduct = await response.json();
    return convertProduct(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    throw new Error('Failed to fetch product');
  }
}

/**
 * Convert external API product format to our internal format
 */
function convertProduct(externalProduct: ExternalProduct): ConvertedProduct {
  return {
    id: externalProduct.id,
    name: externalProduct.title,
    price: externalProduct.price,
    description: externalProduct.description,
    category: externalProduct.category.name,
    image: externalProduct.images[0] || 'https://placehold.co/400x300',
    images: externalProduct.images,
  };
}

/**
 * Format price for display
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}

/**
 * Truncate text to specified length
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}
