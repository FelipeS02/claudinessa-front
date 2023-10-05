'use client';
import React from 'react';
import styles from './button.module.css';

const Button = ({
  children,
  size = 'm',
  color = 'primary',
  className,
  ...attributes
}) => {
  return (
    <button
      className={`${styles[color]} ${styles[size]} ${className}`}
      {...attributes}
    >
      {children}
    </button>
  );
};

export default Button;
