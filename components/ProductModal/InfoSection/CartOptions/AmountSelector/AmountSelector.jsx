'use client';

import { Plus, Minus } from 'lucide-react';
import styles from './amountselector.module.css';
import { Text } from '@/components/ui/Text';

const AmountButton = ({ children, action, onClick, ...attributes }) => {
  return (
    <button
      onClick={(e) => onClick(e, action)}
      data-value={action}
      className={styles.button}
      {...attributes}
    >
      {children}
    </button>
  );
};

const AmountSelector = ({ current, onClick }) => {
  return (
    <div role='input' className={`${styles.container} f-centered`}>
      <AmountButton
        action='decrement'
        onClick={onClick}
        disabled={current.amount === 1}
      >
        <Minus size='1.5em' />
      </AmountButton>
      <Text variant='productPrice'>{current.amount}</Text>
      <AmountButton action='increment' onClick={onClick}>
        <Plus size='1.5em' />
      </AmountButton>
    </div>
  );
};

export default AmountSelector;
