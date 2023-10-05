import Section from '@/app/layout/Section/Section';
import FavCard from './FavCard';
import { FavouritesWrapper } from '../CardsWrapper';

const FavouritesSection = ({ products, ...attributes }) => {
  
  if (!products) return null;
  return (
    <Section name='Los Favoritos' {...attributes}>
      <FavouritesWrapper>
        {products.map((p) => (
          <FavCard
            description={p.description}
            name={p.name}
            isavailable={p.isavailable}
            isondiscount={p.isondiscount}
            price={p.price}
            img={p.img}
            key={`product-${p.name}`}
          />
        ))}
      </FavouritesWrapper>
    </Section>
  );
};

export default FavouritesSection;
