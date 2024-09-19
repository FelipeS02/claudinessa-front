import Link, { LinkProps } from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '../Button';
import { FC, PropsWithChildren } from 'react';
import { VariantProps } from 'class-variance-authority';

interface Props
  extends VariantProps<typeof buttonVariants>,
    LinkProps,
    PropsWithChildren {
  disabled?: boolean;
  className?: string;
}

const LinkButton: FC<Props> = ({
  size,
  variant,
  children,
  disabled,
  href,
  className,
  ...attributes
}) => {
  return (
    <Link
      role='button'
      href={disabled ? '' : href}
      aria-disabled={disabled}
      className={cn(buttonVariants({ variant, size, className }))}
      {...attributes}
    >
      {children}
    </Link>
  );
};

export default LinkButton;
