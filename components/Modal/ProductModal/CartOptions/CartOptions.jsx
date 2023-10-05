'use client';
import React from 'react';
import Text from '@/components/Text/Text';
import Button from '@/components/Button/Button';
import AmountSelector from '@/components/Modal/ProductModal/AmountSelector/AmountSelector';
import styles from './cartoptions.module.css';
import { formatCurrency } from '@/helpers/currency';

const CartOptions = ({ p, currentExtras, currentOrder, onClick, onSubmit }) => {
  const { isOnDiscount } = p;
  const {
    price: { price, offPrice },
    amount,
  } = currentOrder;

  const getTotal = () => {
    let total = 0;

    // Calculo el precio de los extras
    Object.keys(currentExtras).forEach((e) => {
      const extra = currentExtras[e];
      Object.keys(extra).forEach(
        (x) => (total = total + extra[x].price * extra[x].amount)
      );
    });

    // Le agrego el precio indicado segun el estado (descuento / precio normal)
    const p = isOnDiscount ? offPrice : price;
    total = total + p * amount;

    return total;
  };

  return (
    <section className={`${styles.cartOptions} f-centered`}>
      <div className={`f-centered w-100 ${styles.info}`}>
        <Text color='primary'>Tu Pedido:</Text>
        <Text color='primary'>{formatCurrency(getTotal())}</Text>
      </div>
      <div className={`f-centered w-100 ${styles.actions}`}>
        <AmountSelector current={currentOrder} onClick={onClick} />
        <Button size='m'>Agregar a la orden</Button>
      </div>
    </section>
  );
};

export default CartOptions;
