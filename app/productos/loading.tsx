import ProductsSection from '@/components/ProductSection/Product/ProductsSection';

import Wrapper from '@/components/Layout/Wrapper';
import FavouritesSection from '@/components/ProductSection/Favourites/FavouritesSection';
import CategoriesCards from '@/components/Categories/CategoriesCardsNav';
import MenuMainWrapper from '@/components/Layout/Menu/MenuProductsWrapper';
import MenuCartWrapper from '@/components/Layout/Menu/MenuCartWrapper';
import Cart from '@/components/Cart';

const Loading = () => {
  return (
    <>
      <MenuMainWrapper>
        <Wrapper
          className={
            'flex max-w-full max-h-full pb-[100px] lg:overflow-y-scroll lg:block lg:pb-0 lg:pr-0.5'
          }
        >
          <CategoriesCards categories={[]} loading />
          <FavouritesSection products={[]} loading />
          <ProductsSection products={[]} loading />
        </Wrapper>
      </MenuMainWrapper>
      <MenuCartWrapper>
        <Cart loading={true} />
      </MenuCartWrapper>
    </>
  );
};

export default Loading;
