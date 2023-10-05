import React from 'react';
import styles from './product.module.css';
import Text from '../../Text/Text';
import textTypes from '../../Text/textTypes';
import Image from 'next/image';
import { formatCurrency } from '@/helpers/currency';
import Link from 'next/link';

const ProductCard = ({
  id,
  categoryIndex,
  name,
  description,
  prices,
  img,
  isOnDiscount,
  isAvailable,
}) => {
  const stock = isAvailable ? '' : styles.nostock;
  const { price, offPrice } = prices.filter((e) => e.isDefault)[0];

  return (
    <Link
      role='article'
      href={`?${new URLSearchParams({ id, c: categoryIndex })}`}
      className={styles.card}
    >
      <div className={styles.info}>
        <Text color='brand' type={textTypes.productName}>
          {name}
        </Text>
        <Text color='secondary' type={'card-info'}>
          {description}
        </Text>
        <div className={styles.price}>
          {isOnDiscount ? (
            <Text type={textTypes.productPrice} id={styles.oldprice}>
              {formatCurrency(price)}
            </Text>
          ) : null}
          <Text color='brand' type={textTypes.productPrice}>
            {formatCurrency(isOnDiscount ? offPrice : price)}
          </Text>
        </div>
      </div>
      <figure className={`${stock} f-centered`}>
        <Image src={img} alt={name} width={250} height={250} />
        {!isAvailable ? <figcaption>SIN STOCK</figcaption> : null}
      </figure>
    </Link>
  );
};

export default ProductCard;
