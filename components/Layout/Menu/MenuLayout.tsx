import { FC, ReactNode } from 'react';

const MenuLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <main
      className={
        'flex flex-col grow justify-center lg:grid lg:overflow-hidden lg:bg-primary lg:grid-cols-11 lg:grid-rows-1'
      }
    >
      {children}
    </main>
  );
};

export default MenuLayout;
