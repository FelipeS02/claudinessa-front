import React from 'react';
import styles from './favourites.module.css';
import Image from 'next/image';
import Text from '../../Text/Text';
import textTypes from '../../Text/textTypes';
import { formatCurrency } from '@/helpers/currency';

const FavCard = ({
  name,
  description,
  // price,
  img,
  isondiscount,
  isavailable,
}) => {
  const stock = isavailable ? '' : styles.nostock;
  const { price, offprice } = { price: 3000, offprice: 2500 };
  return (
    <article className={styles.card}>
      <figure className={`${styles.picture} ${stock}`}>
        <Image
          src={img}
          alt={name}
          quality={60}
          fill
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />
        {!isavailable ? (
          <figcaption className={styles.nostock}>SIN STOCK</figcaption>
        ) : null}
      </figure>

      <div className={styles.details}>
        <Text color='brand' type={textTypes.productName}>
          {name}
        </Text>
        <Text color='secondary' type={textTypes.productInfo}>
          {description}
        </Text>
        <div className={styles.price}>
          {isondiscount ? (
            <Text type={textTypes.productPrice} id={styles.oldprice}>
              {formatCurrency(price)}
            </Text>
          ) : null}
          <Text color='brand' type={textTypes.productPrice}>
            {formatCurrency(isondiscount ? offprice : price)}
          </Text>
        </div>
      </div>
    </article>
  );
};

export default FavCard;
