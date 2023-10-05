import Text from '@/components/Text/Text';
import Item from './Item';
import styles from './category.module.css';
import textTypes from '@/components/Text/textTypes';

const Badge = ({ idcategory, isOptional, categoryIsFilled, current }) => {
  // Si se selecciono una categoria opcional se debe completar
  const optionalConditional = isOptional && current[idcategory];
  // Categorias obligatorias
  const requiredConditional = !isOptional;

  if (optionalConditional || requiredConditional)
    return (
      <Text
        className={`${styles.badgeText} ${
          categoryIsFilled ? styles.filled : ''
        }`}
      >
        {categoryIsFilled ? 'COMPLETADO' : 'REQUERIDO'}
      </Text>
    );

  return null;
};

const ExtraCategory = ({ category, current, handler }) => {
  if (!category) return null;

  const { name, extras, min, max, isQuantifiable, isOptional, id } = category;

  const categoryIsFilled = () => {
    // Verificar si ya se cumplió con la cantidad minima de productos por categoria
    if (current[id]) {
      const selectedExtrasList = Object.keys(current[id]);
      if (isQuantifiable) {
        let total = 0;
        selectedExtrasList.forEach(
          (e) => (total = total + current[id][e].amount)
        );
        return total >= min;
      }
      return selectedExtrasList.length >= min;
    }
    return false;
  };

  const availableSelections = () => {
    // Calcular la cantidad de extras restantes que se pueden seleccionar en base al maximo
    if (current[id]) {
      const keyList = Object.keys(current[id]);
      if (isQuantifiable) {
        let total = 0;
        keyList.forEach((e) => (total = total + current[id][e].amount));
        return max - total;
      }
      return max - keyList.length;
    }
    return max;
  };

  const handleClick = (action, extra) => {
    const options = {
      type: isQuantifiable ? 'number' : 'check',
      action,
      max,
    };
    handler(id, extra, options);
  };

  return (
    <article className={`${styles.categoryContainer} f-centered`}>
      <div className={styles.categoryInfo}>
        <Text type={textTypes.productName} color='primary'>
          {name}
        </Text>
        <Badge
          idcategory={id}
          categoryIsFilled={categoryIsFilled()}
          current={current}
          isOptional={isOptional}
        />
      </div>
      <Text type={textTypes.optionsSubtitle} style={{ color: 'gray' }}>
        Elige {min} {min > 1 ? 'opciones' : 'opción'} (Max. {max})
      </Text>

      {extras?.map((e) => (
        <Item
          categoryId={id}
          extra={e}
          min={min}
          max={max}
          isQuantifiable={isQuantifiable}
          availableSelections={availableSelections()}
          current={current}
          handler={handleClick}
          key={`item-${e.name}`}
        />
      ))}
    </article>
  );
};

export default ExtraCategory;
