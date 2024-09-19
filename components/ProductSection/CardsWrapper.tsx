import { FC, PropsWithChildren } from 'react';

export const ProductWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div
      className='flex flex-col py-0 w-full gap-0 lg:grid lg:grid-cols-2 lg:gap-4 lg:py-4'
      id='products'
    >
      {children}
    </div>
  );
};
