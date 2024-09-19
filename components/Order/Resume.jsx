'use client';

import CartItem from '@/components/Cart/CartItem';

import { CheckoutSection } from '@/layout/Section/Section';
import { useDispatch, useSelector } from 'react-redux';
import ConfirmDelete from './ConfirmDelete';
import { useEffect, useState } from 'react';
import { deleteProduct, clearInfo } from '@/redux/features/orderSlice';
import Footer from './Footer';
import { notFound } from 'next/navigation';

const RenderItems = ({ order }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [currentProduct, setProduct] = useState(null);

  const { products } = order;

  const onDelete = (index) => {
    dispatch(deleteProduct(index ? index : currentProduct));
  };

  const handleDelete = (index) => {
    if (products.length === 1) {
      setProduct(index);
      return setOpen(true);
    }

    return onDelete(index);
  };

  return (
    <>
      <ConfirmDelete open={open} setOpen={setOpen} onDelete={onDelete} />
      <div className='flex lg:max-h-[512px] pr-2 overflow-scroll flex-col max-w-full'>
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
              customDelete={handleDelete}
              key={`item-${i}-${p.name}`}
            />
          );
        })}
      </div>

      <div
        className='flex flex-col relative max-w-full space-y-1 max-lg:mb-[--_footer-h]'
        id='resume-price'
      >
        <Footer order={order} />
      </div>
    </>
  );
};

const Resume = () => {
  const order = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearInfo());
  }, [dispatch]);

  useEffect(() => {
    if (order.products.length === 0) {
      return notFound();
    }
  }, [order]);

  return (
    <CheckoutSection
      title={<CheckoutSection.Title>Tu Orden:</CheckoutSection.Title>}
      className='h-fit max-h-full sticky top-0 col-span-2'
    >
      <RenderItems order={order} />
    </CheckoutSection>
  );
};

export default Resume;
