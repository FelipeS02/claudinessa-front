import { FC, ReactNode } from 'react';

const MenuMainWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div
      className='lg:mr-0.5 lg:ml-1 lg:col-start-1 md:col-end-9 xl:col-start-2 xl:ml-0 xl:col-end-10'
      id='products'
    >
      {children}
    </div>
  );
};

export default MenuMainWrapper;
