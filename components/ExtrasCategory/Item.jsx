import Text from '@/components/Text/Text';
import { formatCurrency } from '@/helpers/currency';
import { FiPlus, FiMinus } from 'react-icons/fi';
import ExtraNumberButton from '@/components/Modal/ProductModal/ExtraNumberButton/ExtraNumberButton';
import styles from './category.module.css';

const ItemSelector = ({
  isQuantifiable,
  extra,
  handler,
  availableSelections,
  extraState,
}) => {
  if (isQuantifiable)
    return (
      <div className='f-centered' style={{ gap: '0.8rem' }}>
        {extraState?.amount > 0 ? (
          <>
            <ExtraNumberButton onClick={() => handler('decrement', extra)}>
              <FiMinus />
            </ExtraNumberButton>
            <Text color='primary'>{extraState?.amount}</Text>
          </>
        ) : null}
        <ExtraNumberButton
          disabled={availableSelections === 0}
          onClick={() => handler('increment', extra)}
        >
          <FiPlus />
        </ExtraNumberButton>
      </div>
    );
  return (
    <input
      role='checkbox'
      type='checkbox'
      checked={!!extraState}
      aria-checked={!!extraState}
      onChange={() => handler('', extra)}
    />
  );
};

const Item = ({
  categoryId,
  extra,
  isQuantifiable,
  handler,
  current,
  availableSelections,
}) => {
  const { id, price, name, isAvailable } = extra;
  const extraState = current[categoryId]?.[id];

  if (!isAvailable || !extra) return null;

  if (isQuantifiable)
    return (
      <div className={styles.item}>
        <Text color='primary' className={styles.itemName}>
          {name}
        </Text>
        <div className={styles.itemActions}>
          <Text
            color='primary'
            className={`${styles.itemPrice} ${
              extraState ? styles.selected : ''
            }`}
          >
            +{formatCurrency(price * (current[categoryId]?.[id]?.amount || 1))}
          </Text>
          <ItemSelector
            categoryId={categoryId}
            isQuantifiable={isQuantifiable}
            current={current}
            extra={extra}
            handler={handler}
            availableSelections={availableSelections}
            extraState={extraState}
          />
        </div>
      </div>
    );

  return (
    <label className={styles.item}>
      <Text color='primary' className={styles.itemName}>
        {name}
      </Text>
      <div className={styles.itemActions}>
        <Text
          color='primary'
          className={`${styles.itemPrice} ${extraState ? styles.selected : ''}`}
        >
          +{formatCurrency(price * (current[categoryId]?.[id]?.amount || 1))}
        </Text>
        <ItemSelector
          categoryId={categoryId}
          isQuantifiable={isQuantifiable}
          current={current}
          extra={extra}
          handler={handler}
          extraState={extraState}
        />
      </div>
    </label>
  );
};

export default Item;
