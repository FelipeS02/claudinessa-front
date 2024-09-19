import { FC, ReactNode } from 'react';

const MenuCartWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div
      className='border-l border-brand flex justify-center md:col-span-3 xl:col-span-2'
      id='cart'
    >
      {children}
    </div>
  );
};

export default MenuCartWrapper;
