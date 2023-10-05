import React from 'react';
import styles from './cardswrapper.module.css';

export const ProductWrapper = ({ children }) => {
  return <div className={styles.products}>{children}</div>;
};

export const FavouritesWrapper = ({ children }) => {
  return <div className={styles.favourites}>{children}</div>;
};
