import styles from './dialog.module.css';

const Modal = ({ children, open }) => {
  if (open) return null;
  return (
    <dialog
      className={`${styles.dialog} ${mounted ? styles.open : ''}`}
      aria-modal={true}
      open
      ref={ref}
    >
      {children}
    </dialog>
  );
};
