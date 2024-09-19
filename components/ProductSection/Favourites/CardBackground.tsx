import { FC } from 'react';
import Image, { StaticImageData } from 'next/image';
import { FavCardProps } from './FavCard';
import LightBg from '@/public/images/favcard_bglight.png';
import BrandBg from '@/public/images/favcard_bgbrand.png';

const CardBackground: FC<Pick<FavCardProps, 'theme'>> = ({ theme }) => {
  const imageByTheme: Record<typeof theme, StaticImageData> = {
    brand: BrandBg,
    layout: LightBg,
  };

  if (!theme) return null;

  return <Image fill src={imageByTheme[theme]} className='object-cover opacity-50' alt='Product background' />;
};

export default CardBackground;
