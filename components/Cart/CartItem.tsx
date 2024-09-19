'use client';

import QuantitySelector, {
  ProductQuantityModifier,
} from '@/components/ui/QuantitySelector/QuantitySelector';
import { Text } from '../ui/Text';
import { Trash2 } from 'lucide-react';
import Image from 'next/image';
import { formatCurrency } from '@/lib/utils';
import { Button } from '../ui/Button';
import { Product } from '@/models/product.model';
import { FC } from 'react';
import { useAppDispatch } from '@/hooks/typedStoreHooks';
import { modifyOrderProductAmount } from '@/redux/features/orderSlice';

interface ItemProps extends Pick<Product, 'name' | 'img' | 'extras'> {
  index: number;
  price: number;
  amount: number;
  onDelete: () => Promise<void> | void;
}

const RenderExtras: FC<any> = ({ extras }) => {
  return (
    <Text
      color='secondary'
      variant='productInfo'
      className='overflow-hidden relative inline-block text-ellipsis whitespace-nowrap w-full'
    >
      {extras.length > 0
        ? extras.map((e) => `${e.amount}x ${e.name} `)
        : 'Sin extras'}
    </Text>
  );
};

const CartItem: FC<ItemProps> = ({
  index,
  img,
  name,
  price,
  extras,
  amount,
  onDelete,
}) => {
  const dispatch = useAppDispatch();

  const handleAmount = (type: ProductQuantityModifier) => {
    if (type !== 'decrement' && type !== 'increment') return;

    const payload = { type, index };
    dispatch(modifyOrderProductAmount(payload));
  };

  const handleDelete = () => {};

  return (
    <article className='w-full flex items-center gap-4 border-b-2 border-dashed py-2 dark:border-neutral-700 last-of-type:border-solid'>
      <Image
        src={img}
        alt={name}
        width={110}
        height={110}
        className='bg-brand h-[95px] lg:h-[110px] w-auto'
      />
      <div className='flex flex-col gap-1 grow overflow-hidden'>
        <div className='flex items-center justify-between'>
          <Text
            color='brand'
            className='whitespace-nowrap overflow-hidden text-ellipsis text-base font-medium'
          >
            {name}
          </Text>
          <Button variant='icon' onClick={onDelete}>
            <Trash2 size={20} />
          </Button>
        </div>
        <RenderExtras extras={extras} />
        <div className='w-full flex items-center gap-2'>
          <span className='text-normal font-semibold text-brand'>
            {formatCurrency(price)}
          </span>
          <QuantitySelector
            decrementDisabled={amount === 1}
            amount={amount}
            handler={handleAmount}
          />
        </div>
      </div>
    </article>
  );
};

export default CartItem;
