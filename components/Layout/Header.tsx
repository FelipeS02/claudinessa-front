'use client';

import Logo from '../../public/images/logo.webp';
import Image from 'next/image';

const Header = () => {
  return (
    <header className='p-6 flex justify-center items-center bg-layout border-b border-brand max-md:py-4'>
      <Image
        src={Logo}
        placeholder='blur'
        alt='logo'
        height={90}
        className='max-md:h-16 max-md:w-auto'
      />
    </header>
  );
};

export default Header;
