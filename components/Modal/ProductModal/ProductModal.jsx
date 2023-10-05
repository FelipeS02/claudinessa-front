'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import styles from './pmodal.module.css';
import { useRouter } from 'next/navigation';
import Body from './Body';

const ProductModal = ({ products, params, open }) => {
  const { c, id } = params;
  const router = useRouter();
  const ref = useRef(null);
  const [mounted, setMounted] = useState(false);

  const handleClose = () => {
    setMounted(false);
    ref.current.ontransitionend = () => {
      router.replace('/productos', undefined, { shallow: true });
    };
  };

  const p = useMemo(
    () =>
      c && id ? products[c]?.products.find((p) => p.id === Number(id)) : null,
    [c, id, products]
  );

  useEffect(() => {
    if (id && c) {
      setMounted(true);
    }
  }, [c, id]);

  if (!c || !id) return null;

  return (
    <dialog
      className={`${styles.dialog} ${mounted ? styles.open : ''}`}
      aria-modal={true}
      open
      ref={ref}
    >
      <div className={styles.modal}>
        {p ? (
          <Body p={p} handleClose={handleClose} params={params} />
        ) : null}
      </div>
    </dialog>
  );
};

export default ProductModal;
