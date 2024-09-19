import { Plus, Minus } from 'lucide-react';
import { Text } from '../Text';
import { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';

export type ProductQuantityModifier = 'decrement' | 'increment';

export type QuantitySelectorProps = {
  amount?: number;
  handler?: (type: ProductQuantityModifier) => void | Promise<void>;
  loading?: boolean;

  incrementDisabled?: boolean;
  decrementDisabled?: boolean;

  hideIncrement?: boolean;
  hideDecrement?: boolean;
  hideAmount?: boolean;
};

const ModifierButton: FC<
  PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>
> = ({ children, className, ...attributes }) => {
  return (
    <button
      className={cn(
        'flex items-center text-brand-400 p-0.5 border border-brand-400 transition-colors rounded-lg [&>svg]:h-4 [&>svg]:w-4 disabled:border-neutral-400 disabled:text-neutral-400',
        className
      )}
      {...attributes}
    >
      {children}
    </button>
  );
};

const ProductAmountModifier: FC<QuantitySelectorProps> = ({
  amount = 0,
  handler,
  loading,
  incrementDisabled,
  decrementDisabled,
  hideAmount,
  hideDecrement,
  hideIncrement,
}) => {
  return (
    <div className='gap-4 flex items-center'>
      {!hideDecrement ? (
        <ModifierButton
          disabled={decrementDisabled || loading}
          onClick={() => handler('decrement')}
        >
          <Minus />
        </ModifierButton>
      ) : null}
      {!hideAmount ? <Text color='primary'>{amount}</Text> : null}
      {!hideIncrement ? (
        <ModifierButton
          disabled={incrementDisabled || loading}
          onClick={() => handler('increment')}
        >
          <Plus />
        </ModifierButton>
      ) : null}
    </div>
  );
};

export default ProductAmountModifier;
