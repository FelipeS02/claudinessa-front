'use client';

import { Text } from '@/components/ui/Text';
import AmountSelector from './AmountSelector/AmountSelector';
import { formatCurrency } from '@/lib/utils';
import styles from './cartoptions.module.css';
import { Button } from '@/components/ui/Button';

const CartOptions = ({
  p,
  currentExtras,
  currentOrder,
  onClick,
  onSubmit,
  isNotSubmitable,
}) => {
  const { isOnDiscount, isAvailable } = p;
  const {
    price: { price, offPrice },
    amount,
  } = currentOrder;

  const getTotal = () => {
    let total = 0;

    // Calculo el precio de los extras
    Object.keys(currentExtras).forEach((idcategory) => {
      const categoryExtras = currentExtras[idcategory].extras;

      Object.keys(categoryExtras).forEach(
        (idextra) =>
          (total =
            total +
            categoryExtras[idextra].price * categoryExtras[idextra].amount)
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
        <Button
          onClick={onSubmit}
          disabled={isNotSubmitable || !isAvailable}
          size='lg'
          className='w-full'
        >
          {isAvailable ? 'Agregar a la orden' : 'Sin stock'}
        </Button>
      </div>
    </section>
  );
};

export default CartOptions;
