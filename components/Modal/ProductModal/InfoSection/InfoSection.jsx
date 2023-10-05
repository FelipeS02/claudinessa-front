'use client';
import { formatCurrency } from '@/helpers/currency';
import Wrapper from '@/Layout/Wrapper/Wrapper';
import Text from '@/components/Text/Text';
import textTypes from '@/components/Text/textTypes';
import Category from '../../../ExtrasCategory/ExtraCategory';
import { useProduct } from '@/helpers/productsHelpers';
import CartOptions from '../CartOptions/CartOptions';

import styles from './info.module.css';

const Option = ({ option, current, handler }) => {
  const { name, price, id } = option;

  const isSelected = current?.price?.id === id;

  const onClick = () => {
    handler({ type: 'price' }, option);
  };

  if (!option) return null;
  return (
    <label
      className={`${styles.option} ${
        isSelected ? styles.selected : ''
      } f-centered`}
    >
      <div>
        <Text type={textTypes.optionsTitle}>{name}</Text>
        <br />
        <Text
          type={textTypes.productPrice}
          color={isSelected ? 'brand' : 'gray'}
        >
          {formatCurrency(price)}
        </Text>
      </div>
      <input type='radio' checked={isSelected} onClick={onClick} />
    </label>
  );
};

const ProductOptions = ({ current, options, handler }) => (
  <div className={`${styles.options} f-centered`}>
    {options?.map((o) => (
      <Option current={current} option={o} handler={handler} key={o.name} />
    ))}
  </div>
);

const InfoSection = ({
  p,
  currentOrder,
  currentExtras,
  orderHandler,
  extrasHandler,
}) => {
  const { product, isLoading } = useProduct(p.id);

  if (isLoading) return <div>Cargandoooo</div>;

  return (
    <div
      className='f-centered'
      style={{ flexDirection: 'column', justifyContent: 'flex-start' }}
    >
      <div className={`${styles.infoContainer} f-centered underline`}>
        <div className={styles.info}>
          <Text type={textTypes.productInfoTitle} color='brand'>
            {p.name}
          </Text>
          <br />
          <Text type={textTypes.productInfo}>{p.description}</Text>
        </div>
        <ProductOptions
          current={currentOrder}
          options={p.options}
          handler={orderHandler}
        />
      </div>
      <Wrapper className={styles.categoryWrapper}>
        {product?.extras?.map((c) => {
          return (
            <Category
              category={c}
              current={currentExtras}
              handler={extrasHandler}
              key={c.name}
            />
          );
        })}
      </Wrapper>
      <CartOptions
        p={p}
        currentExtras={currentExtras}
        currentOrder={currentOrder}
        onClick={orderHandler}
      />
    </div>
  );
};

export default InfoSection;
