'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Text } from '../../ui/Text';
import { scrollToElement } from '@/helpers/categoriesHelpers';
import { Skeleton } from '../../ui/Skeleton';
import { ProductCategory } from '@/models/product.model';
import { FC, PropsWithChildren } from 'react';

type NavProps = {
  categories: ProductCategory[];
  loading?: boolean;
};

const Loading = () => {
  return (
    <>
      <Skeleton className={'h-[80px] w-[150px]'} />
      <Skeleton className={'h-[80px] w-[150px]'} />
      <Skeleton className={'h-[80px] w-[150px]'} />
      <Skeleton className={'h-[80px] w-[150px]'} />
      <Skeleton className={'h-[80px] w-[150px]'} />
      <Skeleton className={'h-[80px] w-[150px]'} />
    </>
  );
};

const Card = ({ name, img }) => {
  return (
    <Link
      href={`#${name}`}
      onClick={scrollToElement}
      style={{ textDecoration: 'none' }}
      className='w-[150px] flex flex-col relative border-brand-400 border'
    >
      <figure className='flex flex-col justify-center items-center max-w-full max-h-full overflow-hidden'>
        <Image
          src={img}
          alt={name}
          width={200}
          height={200}
          className='w-full h-[60px] object-cover '
        />
        <figcaption className='text-center items-center justify-center w-full border-t border-brand-400'>
          <Text variant='optionsSubtitle' color='brand'>
            {name}
          </Text>
        </figcaption>
      </figure>
    </Link>
  );
};

const CardsWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <nav
      className='pt-4 bg-primary w-full overflow-y-auto flex gap-4 [&>a:last-child]:mr-4 md:py-4 '
      id='card-nav'
    >
      {children}
    </nav>
  );
};

const RenderCategoriesCards: FC<NavProps> = ({ categories, loading }) => {
  if (loading)
    return (
      <CardsWrapper>
        <Loading />
      </CardsWrapper>
    );

  // TODO: no data screen
  if (!categories) return null;

  return (
    <CardsWrapper>
      {categories.map((c) => (
        <Card img={c.products[0].img} name={c.name} key={`nav-card-${c.id}`} />
      ))}
    </CardsWrapper>
  );
};

export default RenderCategoriesCards;
