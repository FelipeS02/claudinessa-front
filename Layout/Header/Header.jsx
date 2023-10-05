import React from 'react';
import styles from './header.module.css';
import Logo from '../../public/images/minlogo.png';
import Image from 'next/image';
import ThemeSwitch from '@/components/ThemeSwitch/ThemeSwitch';

const Header = () => {
  return (
    <header className={`${styles.container} f-centered  underline`}>
      <div className={`${styles.header} f-centered `}>
        <Image
          src={Logo}
          alt={'logo'}
          quality={60}
          style={{ height: '100%', width: 'auto' }}
        />
        <ThemeSwitch />
      </div>
    </header>
  );
};

export default Header;
