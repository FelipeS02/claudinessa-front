'use client';

import { Text } from '../ui/Text';
import { FC, useEffect, useState } from 'react';
import LinkButton from '@/components/ui/Button/LinkButton';
import CartItem from '@/components/Cart/CartItem';
import Image from 'next/image';
import EmptyCart from '@/public/images/empty-cart.png';
import { formatCurrency } from '@/lib/utils';
import { Skeleton } from '../ui/Skeleton';
import { resetStore } from '@/redux/features/orderSlice';
import { useWindowDimensions } from '@/hooks/useWindowsDimesions';
import { useAppDispatch, useAppSelector } from '@/hooks/typedStoreHooks';
import { orderIsExpired } from '@/helpers/orderHelpers';

const NoProducts = () => {
  return (
    <div className='flex flex-col gap-4 text-center my-8'>
      <Image
        src={EmptyCart}
        width={250}
        height={250}
        alt='empty-cart'
        className='w-full h-auto'
      />
      <span className='text-xl font-medium text-[gray]'>
        ¡Tu Carrito esta vacio!
      </span>
    </div>
  );
};

const RenderItems = ({ order }) => {
  const dispatch = useAppDispatch();

  const deleteProduct = () => {};

  if (order.products.length === 0) return <NoProducts />;
  return (
    <>
      {order.products?.map((p, i) => {
        const price =
          (p.isOnDiscount ? p.price.offPrice : p.price.price) * p.amount;
        return (
          <CartItem
            index={i}
            extras={p.extras}
            img={p.img}
            name={p.name}
            price={price}
            amount={p.amount}
            key={`item-${p.name}-${i}`}
            onDelete={() => console.log('hola')}
          />
        );
      })}

      <div className={'flex flex-col sticky bg-primary bottom-0 pb-4 gap-2'}>
        <div className={'py-1 flex items-center w-full justify-between'}>
          <Text color='primary' className='font-semibold'>
            Total:
          </Text>
          <span className='text-brand text-lg font-semibold'>
            {formatCurrency(order.price)}
          </span>
        </div>

        <LinkButton href={'/checkout'} size='lg'>
          Continuar
        </LinkButton>
      </div>
    </>
  );
};

const ItemLoading = () => (
  <div className='flex gap-4'>
    <Skeleton className={'h-[110px] w-[110px]'} />
    <div className='flex flex-col justify-between'>
      <div className='flex flex-col gap-2'>
        <Skeleton className={'w-[150px] h-4'} />
        <Skeleton className={'w-[200px] h-4'} />
      </div>
      <Skeleton className={'w-[100px] h-6'} />
    </div>
  </div>
);

const DesktopCart = ({ order, loading }) => {
  if (loading)
    return (
      <div className='pb-0 p-2 bg-primary overflow-scroll w-full flex flex-col gap-4'>
        <ItemLoading />
        <ItemLoading />
        <ItemLoading />
        <ItemLoading />
      </div>
    );
  return (
    <div className='pb-0 p-2 bg-primary overflow-scroll w-full flex flex-col'>
      <Text variant='sectionTitle' color='brand'>
        Tu orden:
      </Text>
      <RenderItems order={order} />
    </div>
  );
};

const MobileCart = ({ order }) => {
  if (!order || order.products.length === 0) return null;

  const products = order?.products;

  return (
    <div className='bg-layout-secondary py-[1.2rem] px-4 border border-brand grid fixed bottom-0 w-full'>
      <div className={'flex flex-col'}>
        <Text color='primary' className='text-sm'>
          {products.length} {products.length > 1 ? 'Productos' : 'Producto'}
        </Text>
        <Text color='brand' className='text-lg font-semibold'>
          {formatCurrency(order.price)}
        </Text>
      </div>
      <LinkButton href={'/checkout'} size='lg'>
        Ver mi pedido
      </LinkButton>
    </div>
  );
};

const CartComponent: FC<{ loading?: boolean }> = ({ loading = false }) => {
  // Order state
  const order = useAppSelector((state) => state.order);
  const dispatch = useAppDispatch();
  const { created } = order;

  // Component responsive utilities
  const { width } = useWindowDimensions();
  const [mobile, setMobile] = useState(false);

  // Component rendering management
  const [loadingInfo, setLoadingInfo] = useState(true);
  useEffect(() => {
    if (orderIsExpired(new Date(created), 4) === true && loadingInfo) {
      dispatch(resetStore());
    }
    setLoadingInfo(false);
  }, [dispatch, created, loadingInfo]);

  useEffect(() => {
    if (width <= 1024) setMobile(true);
    else setMobile(false);
  }, [width]);

  if (mobile) return <MobileCart order={order} />;
  return <DesktopCart order={order} loading={loading || loadingInfo} />;
};

export default CartComponent;
