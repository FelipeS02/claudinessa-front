import Link from 'next/link';
import React from 'react';
import styles from './button.module.css';

const LinkButton = ({
  size = 'm',
  color = 'primary',
  children,
  ...attributes
}) => {
  return (
    <Link
      role='button'
      className={`${styles[color]} ${styles[size]}`}
      {...attributes}
    >
      {children}
    </Link>
  );
};

export default LinkButton;
