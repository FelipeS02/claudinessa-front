import Button from '@/components/Button/Button';
import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import styles from './closebutton.module.css';

const CloseButton = ({ ...attributes }) => {
  return (
    <button {...attributes} className={styles.closebutton}>
      <FiArrowLeft size={"1.5em"}/>
    </button>
  );
};

export default CloseButton;
