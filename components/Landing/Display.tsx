import LinkButton from '../ui/Button/LinkButton';
import ProductCarrousel from './ProductCarrousel';
import { getProductsImages } from '@/helpers/productsHelpers';
import { Text } from '../ui/Text';
import BG from '@/public/images/pizzadisplay.webp';

const DisplayText = ({ children }: { children: string }) => (
  <Text color='brand' variant='display' className='text-9xl'>
    {children}
  </Text>
);

const LandingDisplay = async () => {
  const images = await getProductsImages();

  return (
    <div className='flex items-center justify-center lg:justify-between lg:h-[582px]'>
      <div
        className='flex flex-col h-full justify-center w-full py-4 px-8 gap-4'
        style={{
          backgroundImage: `url(${BG.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className='text-center lg:text-left'>
          <div className='flex flex-col text-8xl text-brand lg:text-9xl gap-2'>
            <DisplayText>HECHO</DisplayText>
            <DisplayText>CON</DisplayText>
            <DisplayText>AMOR</DisplayText>
          </div>
          <span className='italic text-[white] text-lg font-regular font-poppins'>
            <span className='text-brand'>*</span> Desde 2022
          </span>
        </div>
        <LinkButton href={'/productos'} className={'lg:max-w-[285px] h-12'}>
          PEDÍ AHORA
        </LinkButton>
      </div>

      <div className='flex h-full relative overflow-hidden items-center justify-center max-lg:hidden'>
        <ProductCarrousel carrousel={images} direction={'down'} />
        <ProductCarrousel carrousel={images} direction={'up'} />
        <ProductCarrousel carrousel={images} direction={'down'} />
      </div>
    </div>
  );
};

export default LandingDisplay;
