'use client';
import { Text } from '@/components/ui/Text';
import Item from './Item';
import styles from './category.module.css';
import {
  AccordionTrigger,
  AccordionItem,
  AccordionContent,
} from '@/components/ui/Accordion';
import { Skeleton } from '@/components/ui/Skeleton';

const Badge = ({ idcategory, isOptional, current }) => {
  // Si se selecciono una categoria opcional se debe completar
  const optionalConditional = isOptional && current[idcategory];
  // Categorias obligatorias
  const requiredConditional = !isOptional;

  if (optionalConditional || requiredConditional)
    return (
      <Text
        className={`${styles.badgeText} ${
          current[idcategory]?.isFilled ? styles.filled : ''
        }`}
      >
        {current[idcategory]?.isFilled ? 'COMPLETADO' : 'REQUERIDO'}
      </Text>
    );

  return null;
};

const RenderItems = ({ open, category, handler, current }) => {
  const { extras, min, max, isQuantifiable, id } = category;

  const availableSelections = () => {
    // Calcular la cantidad de extras restantes que se pueden seleccionar en base al maximo
    if (current[id]) {
      const keyList = Object.keys(current[id].extras);
      if (isQuantifiable) {
        let total = 0;
        keyList.forEach(
          (idextra) => (total = total + current[id].extras[idextra].amount)
        );
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
    handler(id, extra, category, options);
  };

  return (
    <>
      <Text variant='optionsSubtitle' color='muted'>
        Elige {min} {min > 1 ? 'opciones' : 'opción'} (Max. {max})
      </Text>

      {extras?.map((e) =>
        e.isAvailable ? (
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
        ) : null
      )}
    </>
  );
};

const ExtraCategory = ({ category, current, handler }) => {
  const { name, isOptional, id } = category || {};

  return (
    <AccordionItem value={id}>
      {category ? (
        <>
          <AccordionTrigger className='flex gap-3 px-2 py-3'>
            <div className='flex w-full justify-between items-center'>
              <Text variant='productName' color='primary'>
                {name}
              </Text>
              <Badge
                idcategory={id}
                current={current}
                isOptional={isOptional}
              />
            </div>
          </AccordionTrigger>
          <AccordionContent className='px-2'>
            <RenderItems
              category={category}
              handler={handler}
              current={current}
            />
          </AccordionContent>{' '}
        </>
      ) : (
        <Skeleton className={'h-5 mx-2 my-3'} />
      )}
    </AccordionItem>
  );
};

export default ExtraCategory;
