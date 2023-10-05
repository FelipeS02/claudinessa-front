import React from 'react';
import styles from './wrapper.module.css';

const Wrapper = ({ children, className = "" }) => {
  return (
    <div className={`${styles.wrapper} ${className} f-centered`} id='wrapper'>
      {children}
    </div>
  );
};

export default Wrapper;
