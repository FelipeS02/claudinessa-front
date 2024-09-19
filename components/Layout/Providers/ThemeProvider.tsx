'use client';

import { ThemeProvider as TP } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';
import { FC } from 'react';

const ThemeProvider: FC<ThemeProviderProps> = ({ children, ...props }) => {
  return <TP {...props}>{children}</TP>;
};

export default ThemeProvider;
