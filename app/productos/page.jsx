import Header from "@/Layout/Header/Header";
import Wrapper from "@/Layout/Wrapper/Wrapper";
import ProductsSection from "@/components/Cards/Product/ProductsSection";

import Categories from "@/components/Categories/Categories";
import ProductModal from "@/components/Modal/ProductModal/ProductModal";


const getProducts = async () => {
  try {
    const products = await fetch(
      'https://localhost:7209/api/Categories/GetProductsCategories',
      {
        cache: 'no-store',
      }
    );

    return products.json();
  } catch (err) {
    console.log(err);
  }
};

const RenderProducts = ({ products }) => {
  if (!products) return null;
  return products.map((c, i) => (
    <ProductsSection
      name={c.name}
      products={c.products}
      categoryIndex={i}
      id={i}
      key={`${c.name}-section`}
    />
  ));
};

const page = async ({ searchParams }) => {
  const products = await getProducts();
  
  return (
    <main className={searchParams?.idproduct ? 'dialog-open' : ''}>
      <Header />
      <Wrapper>
        <Categories categories={products} />
        {/* <FavouritesSection products={products[1]?.products} id={0} /> */}
        <RenderProducts products={products} />
      </Wrapper>
      <ProductModal products={products} params={searchParams}/>
    </main>
  );
};

export default page;
