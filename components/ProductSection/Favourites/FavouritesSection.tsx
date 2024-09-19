import FavCard from './FavCard';
import { Skeleton } from '@/components/ui/Skeleton';
import { MenuSection } from '@/components/Layout/Section';
import { Product } from '@/models/product.model';
import { FC, HTMLAttributes } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/Carousel';

const Loading = () => {
  return (
    <>
      <Skeleton className={'h-[150px] w-[250px] rounded-lg'} />
      <Skeleton className={'h-[150px] w-[250px] rounded-lg'} />
      <Skeleton className={'h-[150px] w-[250px] rounded-lg'} />
      <Skeleton className={'h-[150px] w-[250px] rounded-lg'} />
      <Skeleton className={'h-[150px] w-[250px] rounded-lg'} />
    </>
  );
};

interface SectionProps extends HTMLAttributes<HTMLDivElement> {
  products: Product[];
  loading?: boolean;
}

const RenderCards: FC<Pick<SectionProps, 'products' | 'loading'>> = ({
  products,
  loading,
}) => {
  if (loading) return <Loading />;
  // TODO: No products screen
  if (!products) return null;
  return (
    <Carousel
      className='px-4 w-full lg:px-0'
      opts={{ align: 'start', loop: true }}
    >
      <CarouselContent>
        {products.map((product, i) => (
          <CarouselItem
            className='basis-1/2 md:basis-1/3 lg:basis-1/4'
            key={`fav-product-${product.id}`}
          >
            <FavCard
              className='max-w-[300px] md:max-w-[300px] lg:max-w-[350px]'
              theme={i % 2 === 0 ? 'brand' : 'layout'}
              {...product}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

const FavouritesSection: FC<SectionProps> = ({
  products,
  loading = false,
  ...attributes
}) => {
  return (
    <MenuSection
      loading={loading}
      className='flex flex-col w-full items-center gap-4 [&>span]:text-[2rem] mb-8'
      name='Los favoritos'
      {...attributes}
    >
      <RenderCards products={products} loading={loading} />
    </MenuSection>
  );
};

export default FavouritesSection;
