import Image from 'next/image';
import { cn, formatCurrency } from '@/lib/utils';
import Link from 'next/link';
import { Text } from '@/components/ui/Text';
import { Product } from '@/models/product.model';
import { FC } from 'react';
import CardBackground from './CardBackground';

export interface FavCardProps extends Product {
  theme: 'layout' | 'brand';
  className?: string;
}

const FavCard: FC<FavCardProps> = ({
  id,
  name,
  description,
  options,
  img,
  isOnDiscount,
  isAvailable,
  theme = 'brand',
  className,
}) => {
  const { price, offPrice } = options?.filter((e) => e.isDefault)[0] || {};

  return (
    <Link
      role='article'
      aria-label={name}
      scroll={false}
      href={`/producto/${id}`}
      className={cn(
        'flex items-center justify-center relative w-full max-w-[500px] shadow-md p-2 bg-gradient-to-b from-brand-500 to-brand-600 data-[theme=layout]:from-layout data-[theme=layout]:to-layout-secondary group/favcard',
        className
      )}
      data-theme={theme}
      data-available={isAvailable}
    >
      <CardBackground theme={theme} />
      <div className='flex w-full h-full flex-col items-center border border-dashed border-white group-data-[theme=layout]/favcard:border-brand py-3 pb-2 px-2 gap-3 pointer-events-none z-[2]'>
        <Text className='font-titling font-normal text-3xl tracking-wide drop-shadow-sm text-white group-data-[theme=layout]/favcard:text-brand'>
          {name}
        </Text>
        <Image
          src={img}
          alt={name}
          quality={60}
          width={250}
          height={250}
          className='w-[60%] max-w-[250px] object-scale-down aspect-square'
        />
        <span
          //@ts-ignore tailwind overrides wrap balanced when use text-center and style types don't have text-wrap prop
          style={{ textWrap: 'balance' }}
          className='text-white group-data-[theme=layout]/favcard:text-brand font-medium text-center line-clamp-3'
        >
          {description}
        </span>
        <div className='flex gap-1 justify-center w-full items-center text-brand bg-layout group-data-[theme=layout]/favcard:text-layout group-data-[theme=layout]/favcard:bg-brand py-1'>
          <span className='text-2xl tracking-wider font-titling font-semibold relative flex items-center'>
            {formatCurrency(isOnDiscount ? offPrice : price)}
          </span>
          {isOnDiscount ? (
            <span className='text-lg line-through opacity-70 font-titling tracking-wide'>
              {formatCurrency(price)}
            </span>
          ) : null}
        </div>
      </div>
    </Link>
  );
};

export default FavCard;
