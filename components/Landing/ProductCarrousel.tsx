'use client';

import { useRef, useEffect, useState, FC } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

type ProductImageTypes = {
  img: string;
  alt: string;
};

type ProductsCarrousel = {
  carrousel: string[];
  direction: 'up' | 'down';
};

const ProductImage: FC<ProductImageTypes> = ({ img, alt }) => {
  return (
    <div
      className='border border-brand-400 p-4 flex items-center justify-center flex-shrink-0'
      aria-hidden={true}
    >
      <Image width={160} height={160} src={img} alt={alt} />
    </div>
  );
};

const addAnimation = (scroller: HTMLDivElement) => {
  if (
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    !scroller
  )
    return;

  scroller.setAttribute('data-animated', 'true');
  const scrollerContent: ChildNode[] = Array.from(scroller.children);

  scrollerContent.forEach((item) => {
    const duplicated = item.cloneNode(true);
    scroller.appendChild(duplicated);
  });
};

const randomizeImgs = (imgArray: string[]) => {
  const shuffled = imgArray.sort(() => 0.5 - Math.random());

  return shuffled.slice(0, 10);
};

const getAnimationByDirection = (direction: ProductsCarrousel['direction']) => {
  if (direction !== 'down' && direction !== 'up') return '';

  if (direction === 'down') return 'animate-product-carrousel-down';
  if(direction === "up") return 'animate-product-carrousel-up'

};

const ProductCarrousel: FC<ProductsCarrousel> = ({
  carrousel,
  direction = 'down',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    if (!ref?.current) return;

    addAnimation(ref.current);
  }, []);

  useEffect(() => {
    setImages(randomizeImgs(carrousel));
  }, [carrousel]);

  return (
    <div className='overflow-hidden h-full max-h-full'>
      <div
        className={cn(
          'flex flex-col h-max bg-primary',
          getAnimationByDirection(direction)
        )}
        ref={ref}
      >
        {images?.map((img, i) => (
          <ProductImage img={img} key={`img-${i}`} alt={`img-${i}`} />
        ))}
      </div>
    </div>
  );
};

export default ProductCarrousel;
