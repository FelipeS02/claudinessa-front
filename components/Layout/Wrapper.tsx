import { FC, PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';

interface WrapperProps extends PropsWithChildren {
  className: string;
}

const Wrapper: FC<WrapperProps> = ({ children, className = '' }) => {
  return (
    <section
      className={cn(
        'gap-2 flex-col justify-start relative w-full bg-background lg:gap-0 lg:bg-layout',
        className
      )}
      id='wrapper'
    >
      {children}
    </section>
  );
};

export default Wrapper;
