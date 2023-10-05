import React from 'react';
import styles from './enumberbutton.module.css';

const ExtraNumberButton = ({ children, ...attributes }) => {
  return (
    <button {...attributes} className={styles.eNumberButton}>
      {children}
    </button>
  );
};

export default ExtraNumberButton;
