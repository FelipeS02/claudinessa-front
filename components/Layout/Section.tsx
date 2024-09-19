import {
  FC,
  HTMLAttributes,
  PropsWithChildren,
  ReactNode,
  forwardRef,
} from 'react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/Skeleton';
import { Text } from '../ui/Text';

const sectionClassName = 'flex flex-col align-start relative w-full bg-layout';

interface MenuSectionProps extends HTMLAttributes<HTMLDivElement> {
  name: string | ReactNode;
  loading: boolean;
}

export const MenuSection: FC<MenuSectionProps> = ({
  name = '',
  children,
  loading = false,
  ...attributes
}) => {
  return (
    <div className={cn(sectionClassName, 'px-2 py-4 lg:px-0')} {...attributes}>
      {!loading ? (
        <Text color='brand' variant='sectionTitle'>
          {name}
        </Text>
      ) : (
        <Skeleton className={'h-7 w-[250px]'} />
      )}
      {children}
    </div>
  );
};

export const DefaultSectionTitle: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Text
      color='primary'
      className={
        'font-poppins gap-1 items-center flex font text-base font-medium'
      }
    >
      {children}
    </Text>
  );
};

export const DefaultSectionSubtitle: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Text color='secondary' className={'font-poppins font text-sm font-normal'}>
      {children}
    </Text>
  );
};

interface CheckoutSectionProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  className: string;
}

export const CheckoutSection = forwardRef<HTMLDivElement, CheckoutSectionProps>(
  ({ title, children, className = '', ...attributes }, ref) => {
    return (
      <div
        className={cn(sectionClassName, className, 'p-4 gap-3 md:border-b')}
        ref={ref}
        {...attributes}
      >
        <div className='w-full border-b border-brand-400 pb-2 text-balance'>
          {title}
        </div>
        {children}
      </div>
    );
  }
);
CheckoutSection.displayName = 'CheckoutSection';
