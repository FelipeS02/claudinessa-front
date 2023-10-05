'use client';
import { FiPlus, FiMinus } from 'react-icons/fi';
import styles from './amountselector.module.css';
import Text from '../../../Text/Text';
import textTypes from '../../../Text/textTypes';

const AmountButton = ({ children, action, onClick, ...attributes }) => {
  const options = { type: 'amount', action };
  return (
    <button
      onClick={() => onClick(options)}
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
        <FiMinus size='1.5em' />
      </AmountButton>
      <Text type={textTypes.productPrice}>{current.amount}</Text>
      <AmountButton action='increment' onClick={onClick}>
        <FiPlus size='1.5em' />
      </AmountButton>
    </div>
  );
};

export default AmountSelector;
