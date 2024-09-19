import { FC } from 'react';
import StoreProvider from '../layout/Providers/StoreProvider';
import CartComponent from './Cart';

const Cart: FC<{ loading?: boolean }> = ({ loading = false }) => {
  return (
    <StoreProvider>
      <CartComponent loading={loading} />
    </StoreProvider>
  );
};

export default Cart;
