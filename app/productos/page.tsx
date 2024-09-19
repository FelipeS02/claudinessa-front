import ProductsSection from '@/components/ProductSection/Product/ProductsSection';
import Categories from '@/components/Categories/CategoriesCardsNav';
import ProgressWidget from '@/components/ui/ProgressWidget';
import { getProducts } from '@/helpers/productsHelpers';
import FavouritesSection from '@/components/ProductSection/Favourites/FavouritesSection';
import { ProductCategory } from '@/models/product.model';
import Wrapper from '@/components/Layout/Wrapper';
import MenuMainWrapper from '@/components/Layout/Menu/MenuProductsWrapper';
import MenuCartWrapper from '@/components/Layout/Menu/MenuCartWrapper';
import Cart from '@/components/Cart';

const RenderProductsCategories = ({
  products,
}: {
  products: ProductCategory[];
}) => {
  if (!products) return <ProductsSection products={[]} loading />;
  return products.map((c) => (
    <ProductsSection
      name={c.name}
      products={c.products}
      id={c.name}
      key={`${c.name}-section`}
    />
  ));
};

const page = async () => {
  const products = await getProducts();

  return (
    <>
      <MenuMainWrapper>
        <Wrapper
          className={
            'flex max-w-full max-h-full pb-[100px] lg:overflow-y-scroll lg:block lg:pb-0 lg:pr-0.5'
          }
        >
          <Categories categories={products} />
          <FavouritesSection
            products={products[0]?.products || []}
            id={'Los Favoritos'}
          />
          <RenderProductsCategories products={products} />
        </Wrapper>
      </MenuMainWrapper>

      <MenuCartWrapper>
        <Cart />
      </MenuCartWrapper>
      <ProgressWidget id='wrapper' />
    </>
  );
};

export default page;
