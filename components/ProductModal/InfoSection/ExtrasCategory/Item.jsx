import { Text } from '@/components/ui/Text';
import { formatCurrency } from '@/lib/utils';
import QuantitySelector from '@/components/ui/QuantitySelector/QuantitySelector';
import styles from './category.module.css';

const ItemSelector = ({
  isQuantifiable,
  extra,
  handler,
  availableSelections,
  extraState,
}) => {
  const handleExtra = (type) => {
    handler(type, extra);
  };
  const amount = extraState?.amount || 0;

  if (isQuantifiable)
    return (
      <QuantitySelector
        handler={handleExtra}
        amount={amount}
        showMinus={amount > 0}
        showAmount={amount > 0}
        disabledPlus={availableSelections === 0}
      />
    );
  return (
    <input
      role='checkbox'
      type='checkbox'
      checked={!!extraState}
      aria-checked={!!extraState}
      onChange={() => handleExtra('')}
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
  const extraState = current[categoryId]?.extras[id];

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
            +
            {formatCurrency(
              price * (current[categoryId]?.extras[id]?.amount || 1)
            )}
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
    <div className={styles.item}>
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
    </div>
  );
};

export default Item;
