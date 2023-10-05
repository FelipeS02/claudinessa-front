'use client';

import React, { useEffect } from 'react';
import { ThemeProvider } from 'next-themes';

const Providers = ({ children, ...props }) => {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') {
      document.addEventListener('contextmenu', (e) => e.preventDefault());
      document.onkeydown = (e) => {
        if (e.key === 'F12') {
          return false;
        }

        // disable I key
        if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() == 'i') {
          return false;
        }

        // disable J key
        if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() == 'j') {
          return false;
        }

        // disable U key
        if (e.ctrlKey && e.key.toLowerCase() == 'u') {
          return false;
        }
      };
    }
  }, []);

  return <ThemeProvider {...props}>{children}</ThemeProvider>;
};

export default Providers;
