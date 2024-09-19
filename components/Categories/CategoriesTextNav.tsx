'use client';

import Link from 'next/link';
import { handleScroll } from '@/helpers/categoriesHelpers';
import { Text } from '../ui/Text';
import { FC } from 'react';
import { cn } from '@/lib/utils';
import { ProductCategory } from '@/models/product.model';

type NavElProps = {
  name: string;
  onClick: (e: any) => void;
  sectionId: string;
  isSelected: boolean;
};

type NavProps = {
  categories: ProductCategory[];
};

const NavEl: FC<NavElProps> = ({ name, onClick, isSelected, sectionId }) => {
  return (
    <Link
      href={`#${sectionId}`}
      onClick={onClick}
      aria-selected={isSelected}
      className={cn(
        'p-2 relative',
        'aria-selected:after:content-["*"] aria-selected:after:absolute aria-selected:after:w-full aria-selected:after:left-0 aria-selected:after:bottom-0',
        'text-nowrap no-underline'
      )}
    >
      <Text
        variant='optionsSubtitle'
        color={isSelected ? 'brand' : 'secondary'}
      >
        {name}
      </Text>
    </Link>
  );
};

const CategoriesTextNav: FC<NavProps> = ({ categories }) => {
  return (
    <nav className='flex justify-start align-middle gap-1 sticky -top-0.5 bg-layout z-10 w-full'>
      {categories.map((c) => (
        <NavEl
          name={c.name}
          onClick={handleScroll}
          sectionId={c.name}
          isSelected={false}
          key={`nav-el-${c.name}`}
        />
      ))}
    </nav>
  );
};

export default CategoriesTextNav;
