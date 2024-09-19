import { Product } from '@/models/product.model';

export const getProductsImages = async (): Promise<string[] | null> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/Products/GetProductsImages`
    );

    if (!response.ok) return null;

    const images = response.json();

    if (!images) return null;

    return images;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getProducts = async (): Promise<Product[] | null> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/Categories/GetProductsCategories`,
      {
        cache: 'no-store',
      }
    );

    if (!response.ok) return null;

    const products = response.json();

    if (!products) return null;

    return products;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getProduct = async (id): Promise<Product | null> => {
  try {
    if (!id) return null;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/Products/GetProduct/${id}`,
      { cache: 'no-store' }
    );

    if (!response.ok) return null;

    const product = await response.json();

    if (!product) return null;

    return product;
  } catch (err) {
    console.log(err);
    return null;
  }
};
