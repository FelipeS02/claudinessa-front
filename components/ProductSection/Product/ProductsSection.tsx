import { FC, HTMLAttributes } from 'react';
import { Skeleton } from '@/components/ui/Skeleton';
import { ProductWrapper } from '../CardsWrapper';
import ProductCard from './ProductCard';
import { Product } from '@/models/product.model';
import { MenuSection } from '@/components/Layout/Section';

interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  products: Product[];
  name?: string;
  loading?: boolean;
}

const Loading = () => {
  return (
    <>
      <Skeleton className={'h-[120px] lg:h-[142px] w-full rounded-md'} />
      <Skeleton className={'h-[120px] lg:h-[142px] w-full rounded-md'} />
      <Skeleton className={'h-[120px] lg:h-[142px] w-full rounded-md'} />
      <Skeleton className={'h-[120px] lg:h-[142px] w-full rounded-md'} />
      <Skeleton className={'h-[120px] lg:h-[142px] w-full rounded-md'} />
      <Skeleton className={'h-[120px] lg:h-[142px] w-full rounded-md'} />
      <Skeleton className={'h-[120px] lg:h-[142px] w-full rounded-md'} />
      <Skeleton className={'h-[120px] lg:h-[142px] w-full rounded-md'} />
    </>
  );
};

const RenderCards: FC<Pick<Props, 'products' | 'loading'>> = ({
  products,
  loading,
}) => {
  if (loading) return <Loading />;
  // TODO: No products screen
  if (!products) return null;
  return (
    <>
      {products.map((p) => (
        <ProductCard {...p} key={`product-${p.name}`} />
      ))}
    </>
  );
};

const ProductsSection: FC<Props> = ({
  products = [],
  name = '',
  loading = false,
  ...attributes
}) => {
  // Si estan en descuento las ordeno al principio de la lista
  const sortedProducts =
    products?.sort((a, b) => (a.isOnDiscount && !b.isOnDiscount ? -1 : 1)) ||
    null;

  return (
    <MenuSection name={name} loading={loading} {...attributes}>
      <ProductWrapper>
        <RenderCards products={sortedProducts} loading={loading} />
      </ProductWrapper>
    </MenuSection>
  );
};

export default ProductsSection;
