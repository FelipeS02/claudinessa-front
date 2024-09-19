'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import InfoSection from '../InfoSection/InfoSection';
import CloseButton from '../CloseButton/CloseButton';
import styles from './body.module.css';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { addProduct } from '@/redux/features/orderSlice';

const orderProductDefault = (p) => {
  const { id, name, img, options, isOnDiscount } = p;
  return {
    idproduct: id,
    name,
    price: options?.find((o) => o.isDefault),
    img,
    amount: 1,
    comment: '',
    isOnDiscount,
    extras: [],
  };
};

const loadExtras = (p) => {
  const newExtras = {};
  p.extras.forEach((e) => {
    if (!e.isOptional) {
      newExtras[e.id] = { extras: {}, isFilled: false };
    }
  });
  return newExtras;
};

const handleClose = async (router) => {
  router.replace('/productos', undefined, { shallow: true });
};

const hideDialogOutline = () => {
  const el = document.querySelector('[role="dialog"]');
  if (el) {
    el.classList.add('outline-0');
  }
};

const Body = ({ p }) => {
  const [order, setOrder] = useState(null);
  const router = useRouter();
  const dispatch = useDispatch();
  // Diccionario que contiene la informacion de los adicionales seleccionados por el cliente
  const [extras, setExtras] = useState(null);

  useEffect(() => {
    if (p) {
      setExtras(loadExtras(p));
      setOrder(orderProductDefault(p));
      hideDialogOutline();
    }
  }, [p]);

  const handleOrderChange = (e, action) => {
    const {
      target: { name, value },
    } = e;

    setOrder((prevState) => {
      const newState = JSON.parse(JSON.stringify(prevState));
      // Controlador para la cantidad de unidades solicitadas
      if (action === 'increment') {
        ++newState.amount;
        return newState;
      }
      if (action === 'decrement') {
        --newState.amount;
        return newState;
      }

      // Controlador para selector de opciones de precio
      if (name === 'price') {
        newState[name] = p?.options?.find((o) => o.id === Number(value));
        return newState;
      }

      newState[name] = value;
      return newState;
    });
  };

  const handleExtraChange = (categoryId, extra, category, options) => {
    const { id, name, price } = extra;
    const { min, isQuantifiable } = category;
    const { type, action, max = 0 } = options;

    setExtras((prevState) => {
      const newState = JSON.parse(JSON.stringify(prevState));

      const extrasCategory = newState[categoryId]?.extras;

      // Si no existe la categoria la creo
      if (!extrasCategory)
        newState[categoryId] = { extras: {}, isFilled: false };

      const { [id]: e } = extrasCategory || {};

      if (e) {
        // Si ya se agrego a la orden
        if (type === 'check') {
          delete newState[categoryId].extras[id];
        }

        if (type === 'number') {
          if (action === 'increment') {
            ++e.amount;
          }

          if (action === 'decrement') {
            if (e.amount > 1) {
              --e.amount;
            } else {
              delete newState[categoryId].extras[id];
            }
          }
        }
      } else {
        if (type === 'check') {
          const categoryExtras = Object.keys(newState[categoryId].extras);
          if (categoryExtras.length === max) {
            // Si ya se alcanzo el maximo de extras seleccionados para esa categoria
            delete newState[categoryId].extras[categoryExtras[0]];
            // Elimino el primer seleccionado
          }
        }
        newState[categoryId].extras[id] = {
          id,
          name,
          amount: 1,
          price,
        };
      }

      if (
        Object.keys(newState[categoryId].extras).length === 0 &&
        category.isOptional
      ) {
        delete newState[categoryId]; // Elimino categorias residuales en caso de ninguna seleccion
      } else {
        newState[categoryId].isFilled = categoryIsFilled(
          categoryId,
          newState,
          isQuantifiable,
          min
        );
      }

      return newState;
    });
  };

  const categoryIsFilled = (id, newState, isQuantifiable, min) => {
    // Verificar si ya se cumplió con la cantidad minima de productos por categoria
    if (newState[id]) {
      const selectedExtrasList = Object.keys(newState[id].extras);
      if (isQuantifiable) {
        let total = 0;
        selectedExtrasList.forEach(
          (e) => (total = total + newState[id].extras[e].amount)
        );
        return total >= min;
      }
      return selectedExtrasList.length >= min;
    }
    return false;
  };

  const isNotSubmitable = () => {
    if (extras) {
      const keys = Object.keys(extras);
      let flag = false;
      for (let i = 0; i < keys.length; i++) {
        if (!extras[keys[i]]?.isFilled) {
          flag = true;
          break;
        }
      }

      return flag;
    }
  };

  const onSubmit = async () => {
    const newProduct = { ...order };

    Object.keys(extras).forEach((idcategory) => {
      Object.keys(extras[idcategory].extras).forEach((idextra) => {
        newProduct.extras.push(extras[idcategory].extras[idextra]);
      });
    });

    await dispatch(addProduct(newProduct));
    return await handleClose(router);
  };

  if (!p || !extras || !order) return null;

  return (
    <>
      <div
        className={
          'flex flex-col w-100 lg:col-start-3 lg:mx-auto lg:col-span-3'
        }
      >
        <header className={styles.header}>
          <CloseButton onClick={() => handleClose(router)} />
        </header>
        <Image
          src={p?.img}
          alt={p?.name}
          width={400}
          height={400}
          className={styles.img}
        />
      </div>

      <InfoSection
        p={p}
        currentExtras={extras}
        currentOrder={order}
        orderHandler={handleOrderChange}
        extrasHandler={handleExtraChange}
        onSubmit={onSubmit}
        isNotSubmitable={isNotSubmitable()}
      />
    </>
  );
};

export default Body;
