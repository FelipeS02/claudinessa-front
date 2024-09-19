import { FC } from 'react';
import Image from 'next/image';
import { formatCurrency } from '@/lib/utils';
import Link from 'next/link';
import { Text } from '@/components/ui/Text';
import { Product } from '@/models/product.model';

const ProductCard: FC<Product> = ({
  id,
  name,
  description,
  options,
  img,
  isOnDiscount,
  isAvailable,
}) => {
  const { price, offPrice } = options.filter((e) => e.isDefault)[0] || {};

  return (
    <Link
      role='article'
      aria-label={name}
      scroll={false}
      href={`/producto/${id}`}
      className='w-full relative flex bg-layout justify-between max-md:last-of-type:border-none border-b-[1.5px] border-product hover:border-product-hover cursor-pointer group/productCard'
      data-available={isAvailable}
    >
      <div className='flex flex-col gap-1 flex-grow overflow-hidden'>
        <Text color='brand' variant='productName'>
          {name}
        </Text>
        <Text
          color='secondary'
          variant='cardInfo'
          className='h-[34px] line-clamp-2 lg:h-[50px] lg:line-clamp-4 text-ellipsis'
        >
          {description}
        </Text>
        <div className='flex gap-1'>
          {isOnDiscount ? (
            <Text
              variant='productPrice'
              className='text-neutral-500 relative line-through decoration-2 decoration-brand'
            >
              {formatCurrency(price)}
            </Text>
          ) : null}
          <Text color='brand' variant='productPrice'>
            {formatCurrency(isOnDiscount ? offPrice : price)}
          </Text>
        </div>
      </div>
      <figure className='m-0 flex flex-col items-center justify-center relative overflow-hidden min-w-[112px] lg:min-w-[145px] aspect-square'>
        <Image
          src={img}
          alt={name}
          fill
          className={`relative object-contain object-center group-data-[available=false]/productCard:grayscale`}
        />
        {!isAvailable ? (
          <figcaption className='text-white text-sm p-0.5 font-medium bg-brand w-full text-center absolute'>
            SIN STOCK
          </figcaption>
        ) : null}
      </figure>
    </Link>
  );
};

export default ProductCard;
