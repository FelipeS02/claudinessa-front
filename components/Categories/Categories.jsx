import React from 'react';

import Text from '../Text/Text';
import textTypes from '../Text/textTypes';
import CardNav from './CardNav';
import TextNav from './TextNav';

import styles from './categories.module.css';

const Categories = ({ categories }) => {
  if (!categories) return null;
  return (
    <>
      <section className={`${styles.section} f-centered`}>
        <Text color='brand' type={textTypes.sectionTitle}>
          EXPLORÁ NUESTRO MENÚ
        </Text>
        <CardNav categories={categories} />
      </section>
      <TextNav categories={categories} />
    </>
  );
};

export default Categories;
