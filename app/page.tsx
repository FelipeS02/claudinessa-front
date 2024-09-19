import Image, { StaticImageData } from 'next/image';

import Milanesa from '../public/images/milanesas.webp';
import Empanadas from '../public/images/empanadas.webp';
import Burger from '../public/images/burger.webp';

import LandingHeader from '@/components/Landing/Header';
import LandingDisplay from '@/components/Landing/Display';
import { Text } from '@/components/ui/Text';
import { FC, ReactNode } from 'react';

type AboutItemProps = {
  img: StaticImageData;
  title: string;
  info: string | ReactNode;
};

const AboutItem: FC<AboutItemProps> = ({ img, title, info }) => {
  return (
    <div
      className={
        'h-[500px] grid w-full border-y border-brand grid-rows-2 lg:grid-cols-2 lg:grid-rows-1 lg:h-[40vh] group/item'
      }
    >
      <div
        className={
          'flex border-brand max-lg:border-b flex-col justify-center p-4 row-span-1 lg:col-span-1 lg:group-even/item:items-end'
        }
      >
        <Text className='text-3xl md:text-4xl font-semibold' color={'brand'}>
          {title}
        </Text>

        <Text color={'brand'}>{info}</Text>
      </div>
      <div
        className={
          'f-centered relative row-span-1 lg:col-span-1 lg:group-even/item:-order-1'
        }
      >
        <Image
          src={img}
          alt={title}
          placeholder='blur'
          quality={100}
          fill
          className='object-cover object-center'
        />
      </div>
    </div>
  );
};

export default function Landing() {
  return (
    <main className={'bg-primary'}>
      <LandingHeader />
      <LandingDisplay />
      <div
        className={`flex flex-col relative items-center after:content-[""] after:absolute after:h-full after:border-brand lg:after:border-[1.75px]`}
      >
        <AboutItem
          img={Burger}
          title={'Hamburguesas bajoneras'}
          info={'Si, caimos del cielo'}
        />
        <AboutItem
          img={Empanadas}
          title='Las Mejores de Hudson'
          info={
            <>
              Crocantes, jugosas & abundantes. <br />
              Empanadas hechas para cambiarte la vida
            </>
          }
        />
        <AboutItem
          img={Milanesa}
          title='Milanesas como las de mamá'
          info='Doraditas por fuera, tiernas por dentro.'
        />
      </div>
    </main>
  );
}
