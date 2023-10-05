'use client';
import React, { useState, useEffect, useCallback } from 'react';
import styles from './categories.module.css';
import Link from 'next/link';
import Text from '../Text/Text';
import textTypes from '../Text/textTypes';
import { handleScroll } from '@/helpers/categoriesHelpers';

const NavEl = ({ name, onClick, isSelected, idsection }) => {
  return (
    <Link
      href={`#${idsection}`}
      onClick={onClick}
      style={{ textDecoration: 'none', textWrap: 'nowrap' }}
      className={`${styles.navEl} ${isSelected ? styles.isSelected : ''}`}
    >
      <Text
        type={textTypes.optionsSubtitle}
        color={isSelected ? 'brand' : 'secondary'}
      >
        {name}
      </Text>
    </Link>
  );
};

const TextNav = ({ categories }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const onScroll = useCallback(() => {
    // Función para manejar el scroll y actualizar la selección del navbar
    const scrollPosition = window.scrollY;
    const sections = document.querySelectorAll('section'); // Obtener todas las secciones
    // Determina cuál sección está en la parte superior de la vista
    let newSelectedItem = null;
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.clientHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        newSelectedItem = section.getAttribute('id');
      }
    });

    // Actualiza el estado del elemento seleccionado
    return setSelectedItem(newSelectedItem);
  }, []);

  useEffect(() => {
    // Agregar event listener para el evento de scroll
    document.addEventListener('scroll', onScroll, { passive: true });

    // Limpia el event listener cuando el componente se desmonta
    return () => {
      document.removeEventListener('scroll', onScroll, { passive: true });
    };
  }, [onScroll, categories]);

  return (
    <nav className={styles.textNav}>
      {categories.map((c, i) => (
        <NavEl
          isSelected={selectedItem === i}
          name={c.name}
          onClick={handleScroll}
          idsection={i}
          key={`nv-el-${c.name}`}
        />
      ))}
    </nav>
  );
};

export default TextNav;
