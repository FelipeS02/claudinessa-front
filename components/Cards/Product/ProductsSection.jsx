import Section from "@/Layout/Section/Section";
import { ProductWrapper } from "../CardsWrapper";
import ProductCard from "./ProductCard";

const ProductsSection = ({ products, categoryIndex, name, ...attributes }) => {
  return (
    <Section name={name} {...attributes}>
      <ProductWrapper direction={'column'}>
        {products.map((p) => (
          <ProductCard
            id={p.id}
            categoryIndex={categoryIndex}
            description={p.description}
            name={p.name}
            isAvailable={p.isAvailable}
            isOnDiscount={p.isOnDiscount}
            prices={p.options}
            img={p.img}
            key={`product-${p.name}`}
          />
        ))}
      </ProductWrapper>
    </Section>
  );
};

export default ProductsSection;
