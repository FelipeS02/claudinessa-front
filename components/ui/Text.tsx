import { forwardRef, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const textVariants = cva('font-poppins', {
  variants: {
    variant: {
      default: 'text-base',
      display: 'font-titling text-8xl tracking-wider font-bold',
      sectionTitle: 'font-titling font-semibold text-2xl tracking-widest',
      productInfoTitle: 'font-titling font-semibold  text-3xl',
      productName: 'text-lg font-semibold',
      productPrice: 'text-xl font-bold',
      optionsTitle: 'text-sm tracking-wide',
      cardInfo: 'text-md',
      productInfo: 'text-sm tracking-wider',
      optionsSubtitle: 'text-xs font-medium',
    },
    color: {
      primary: 'text-foreground',
      secondary: 'text-secondary-foreground',
      brand: 'text-brand',
      muted: 'text-neutral-500',
    },
  },
  defaultVariants: {
    variant: 'default',
    color: 'primary',
  },
});

export interface TextProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, 'color'>,
    VariantProps<typeof textVariants> {}

const Text = forwardRef<HTMLSpanElement, TextProps>(
  ({ className, variant, color, ...props }, ref) => (
    <span
      className={cn(textVariants({ variant, color, className }))}
      ref={ref}
      {...props}
    />
  )
);

Text.displayName = 'Text';

export { Text, textVariants };
