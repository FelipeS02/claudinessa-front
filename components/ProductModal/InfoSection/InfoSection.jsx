'use client';

import Wrapper from '@/components/Layout/Wrapper';
import { Text } from '@/components/ui/Text';
import Category from './ExtrasCategory/ExtraCategory';
import CartOptions from './CartOptions/CartOptions';
import ProductOptions from './ProductOptions/ProductOptions';
import CommentSection from './CommentSection/CommentSection';
import styles from './info.module.css';
import { Accordion } from '@radix-ui/react-accordion';

const sortExtras = (a, b) => {
  if (a.isOptional && !b.isOptional) {
    return 1;
  } else if (!a.isOptional && b.isOptional) {
    return -1;
  }
  return 0;
};

const InfoSection = ({
  p,
  currentOrder,
  currentExtras,
  orderHandler,
  extrasHandler,
  onSubmit,
  isNotSubmitable,
}) => {
  const sortedExtras = p?.extras?.toSorted(sortExtras) || [];
  const defaultExtra = sortedExtras?.find((e) => !e.isOptional)?.id;
  return (
    <div
      className={
        'flex flex-col overflow-y-scroll relative grow lg:col-span-3 lg:max-h-screen lg:mt-[35px]'
      }
    >
      <div className={`flex flex-col px-2 py-4 gap-2 border-b border-brand`}>
        <div className={styles.info}>
          <Text variant='productInfoTitle' color='brand'>
            {p.name}
          </Text>
          <br />
          <Text variant='productInfo'>{p.description}</Text>
        </div>
        <ProductOptions
          current={currentOrder}
          options={p.options}
          isOnDiscount={p.isOnDiscount}
          handler={orderHandler}
        />
      </div>
      <Wrapper className={'pb-[120px] lg:pb-0 grow'}>
        <Accordion
          defaultValue={defaultExtra}
          collapsible
          className='flex flex-col bg-primary'
        >
          {sortedExtras.map((c) => {
            return (
              <Category
                category={c}
                current={currentExtras}
                handler={extrasHandler}
                key={c.name}
              />
            );
          })}
        </Accordion>
        <CommentSection onChange={orderHandler} value={currentOrder?.comment} />
      </Wrapper>
      <CartOptions
        p={p}
        currentExtras={currentExtras}
        currentOrder={currentOrder}
        onClick={orderHandler}
        onSubmit={onSubmit}
        isNotSubmitable={isNotSubmitable}
      />
    </div>
  );
};

export default InfoSection;
