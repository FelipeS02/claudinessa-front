'use client';
import React, { lazy, useState } from 'react';
import Button from '../../Button/Button';
import Image from 'next/image';
import styles from './pmodal.module.css';
import InfoSection from './InfoSection/InfoSection';
import CloseButton from './CloseButton/CloseButton';

const orderProductDefault = (p) => {
  if (!p) return null;
  const { name, img, options } = p;
  return {
    name,
    price: options?.find((o) => o.isDefault),
    img,
    amount: 1,
    comment: '',
    extras: [],
  };
};

const Body = ({ p, handleClose }) => {
  const [order, setOrder] = useState(orderProductDefault(p));
  // Diccionario que contiene la informacion de los adicionales seleccionados por el cliente { [idcategoria]: {[idextra]: {name, amount, price} }}
  const [extras, setExtras] = useState({});

  const handleOrderChange = (options, data = {}) => {
    setOrder((prevState) => {
      const { type, action = '' } = options;
      const newState = JSON.parse(JSON.stringify(prevState));

      // Controlador para la cantidad de unidades solicitadas
      if (type === 'amount') {
        if (action === 'decrement') {
          --newState.amount;
        }
        if (action === 'increment') {
          ++newState.amount;
        }
      }

      // Controlador para las opciones
      if (type === 'price' && data !== {}) {
        newState.price = data;
      }

      return newState;
    });
  };

  const handleExtraChange = (categoryId, extra, options) => {
    const { id, name, price } = extra;
    const { type, action, max = 0 } = options;

    setExtras((prevState) => {
      const newState = JSON.parse(JSON.stringify(prevState));

      if (!newState[categoryId]) newState[categoryId] = {};

      if (newState[categoryId][id]) {
        // Si ya se agrego a la orden

        if (type === 'check') {
          delete newState[categoryId][id];
        }

        if (type === 'number') {
          if (action === 'increment') {
            ++newState[categoryId][id].amount;
          }
          if (action === 'decrement') {
            if (newState[categoryId][id].amount > 1) {
              --newState[categoryId][id].amount;
            } else {
              delete newState[categoryId][id];
            }
          }
        }
      } else {
        if (type === 'check') {
          const categoryExtras = Object.keys(newState[categoryId]);
          if (categoryExtras.length === max) {
            // Si ya se alcanzo el maximo de extras seleccionados para esa categoria
            delete newState[categoryId][categoryExtras[0]];
            // Elimino el primer seleccionado
          }
        }

        newState[categoryId][id] = {
          name,
          amount: 1,
          price,
        };
      }

      if (Object.keys(newState[categoryId]).length === 0)
        delete newState[categoryId]; // Elimino categorias residuales en caso de ninguna seleccion

      return newState;
    });
  };

  return (
    <>
      <section className={styles.body}>
        <div>
          <header className={styles.header}>
            <CloseButton onClick={handleClose}>Cerrar</CloseButton>
          </header>
          <Image
            role='figure'
            src={p?.img}
            alt={p?.name}
            width={500}
            height={500}
            className={styles.img}
          />
        </div>

        <InfoSection
          p={p}
          currentExtras={extras}
          currentOrder={order}
          orderHandler={handleOrderChange}
          extrasHandler={handleExtraChange}
        />
      </section>
    </>
  );
};

export default Body;
