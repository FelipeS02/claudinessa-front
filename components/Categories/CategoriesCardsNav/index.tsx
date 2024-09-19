import { ProductCategory } from '@/models/product.model';
import { MenuSection } from '../../Layout/Section';
import { FC } from 'react';
import RenderCategoriesCards from './RenderCNav';

type SectionProps = {
  categories: ProductCategory[];
  loading?: boolean;
};

const CategoriesCardsNav: FC<SectionProps> = ({
  categories,
  loading = false,
}) => {
  return (
    <MenuSection loading={loading} name={'EXPLORÁ NUESTRO MENU'}>
      <RenderCategoriesCards categories={categories} />
    </MenuSection>
  );
};

export default CategoriesCardsNav;
