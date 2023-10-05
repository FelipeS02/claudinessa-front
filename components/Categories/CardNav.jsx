'use client';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import Text from '../Text/Text';
import textTypes from '../Text/textTypes';
import { handleScroll } from '@/helpers/categoriesHelpers';
import styles from './categories.module.css';

const Card = ({ name, img, idsection, onClick }) => {
  return (
    <Link
      href={`#${idsection}`}
      onClick={onClick}
      style={{ textDecoration: 'none' }}
    >
      <figure className={`${styles.card} f-centered`}>
        <Image
          src={img}
          alt={name}
          width={200}
          height={200}
        />
        <figcaption className='f-centered'>
          <Text type={textTypes.optionsSubtitle} color='brand'>
            {name}
          </Text>
        </figcaption>
      </figure>
    </Link>
  );
};

const CardNav = ({ categories }) => {
  return (
    <nav className={`${styles.cardNav}`} id='card-nav'>
      {categories.map((c, i) => (
        <Card
          img={c.products[0].img}
          name={c.name}
          onClick={handleScroll}
          idsection={i}
          key={`c-${c.name}`}
        />
      ))}
    </nav>
  );
};

export default CardNav;
