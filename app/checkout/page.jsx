import React from 'react';
import Order from '@/components/Order/Order';
import Resume from '@/components/Order/Resume';
import BackButton from '@/components/Order/BackButton';
import SuccessScreen from '@/components/Order/SuccessScreen';

const page = () => {
  return (
    <>
      <main
        className='flex flex-col m-auto my-4 max-h-full gap-2 max-lg:mt-2 lg:max-w-[1184px]'
        id='page'
      >
        <BackButton />
        <div className='flex flex-col gap-2 bg-layout-secondary lg:gap-4 lg:grid lg:grid-cols-6'>
          <Order />
          <Resume />
        </div>
      </main>
      <SuccessScreen />
    </>
  );
};

export default page;
