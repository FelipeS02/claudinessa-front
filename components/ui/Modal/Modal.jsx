'use client';
import { useEffect } from 'react';
import styles from './dialog.module.css';

const Modal = ({ children }) => {
  useEffect(() => {
    document.body.classList.add('dialog-open');

    return () => {
      document.body.classList.remove('dialog-open');
    };
  }, []);

  return (
    <dialog id='dialog' className={styles.dialog} open aria-modal={true}>
      <div className={styles.modal}>{children}</div>
    </dialog>
  );
};

export default Modal;
