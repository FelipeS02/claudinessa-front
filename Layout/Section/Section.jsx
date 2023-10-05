import React from 'react';
import Text from '../../components/Text/Text';
import textTypes from '../../components/Text/textTypes';
import styles from './section.module.css';

const Section = ({ name, children, ...attributes }) => {
  return (
    <section className={`${styles.section} f-centered`} {...attributes}>
      <Text color='brand' type={textTypes.sectionTitle}>
        {name}
      </Text>
      {children}
    </section>
  );
};

export default Section;
