import { Text } from '@/components/ui/Text';
import styles from './options.module.css';
import { formatCurrency } from '@/lib/utils';

const Option = ({ option, isOnDiscount, current, handler }) => {
  const { name, price, offPrice, id } = option;

  const isSelected = current?.price?.id === id;

  if (!option) return null;
  return (
    <label
      className={`${styles.option} ${
        isSelected ? styles.selected : ''
      } f-centered`}
    >
      <div>
        <Text variant='optionsTitle' color={isSelected ? 'brand' : 'gray'}>
          {name}
        </Text>
        <br />
        <Text variant='productPrice' color={isSelected ? 'brand' : 'muted'}>
          {formatCurrency(isOnDiscount ? offPrice : price)}
        </Text>
      </div>
      <input
        type='radio'
        name='price'
        checked={isSelected}
        onChange={handler}
        value={option.id}
      />
    </label>
  );
};

const ProductOptions = ({ current, isOnDiscount, options, handler }) => (
  <div className={`${styles.options} f-centered`}>
    {options?.map((o) => (
      <Option
        current={current}
        isOnDiscount={isOnDiscount}
        option={o}
        handler={handler}
        key={o.name}
      />
    ))}
  </div>
);

export default ProductOptions;
