import { FC, Fragment } from 'react';
import { getCategoriesName } from '@/helpers/categoriesHelpers';
import Logo from '@/public/images/logo.webp';
import Image from 'next/image';
import { ProductCategory } from '@/models/product.model';

type MarqueeProps = {
  categories: ProductCategory[];
};

const Marquee: FC<MarqueeProps> = ({ categories }) => {
  return (
    <div className='w-100 overflow-hidden'>
      <ul className='flex gap-2 text-brand items-center style-none animate-marquee-scroll'>
        {categories?.map((c, i) => (
          <Fragment key={`marquee-i-${c.id}`}>
            <li className='flex-shrink-0 text-xl uppercase'>{c.name}</li>
            {i !== categories.length - 1 ? <li>&bull;</li> : null}
          </Fragment>
        ))}
      </ul>
    </div>
  );
};

const LandingHeader = async () => {
  const categories = await getCategoriesName();

  return (
    <hgroup className='flex flex-col'>
      <header className='flex py-8 items-center justify-center border-b-2 border-brand-400'>
        <Image
          src={Logo}
          alt='logo'
          width={300}
          quality={80}
          className='h-auto min-w-[250px] w-[30vw] max-w-[350px]'
        />
      </header>
      <section className='relative py-2 w-100 overflow-hidden border-brand-400 border-b-2'>
        <Marquee categories={categories} />
      </section>
    </hgroup>
  );
};

export default LandingHeader;
