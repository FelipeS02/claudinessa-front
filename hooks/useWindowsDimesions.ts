import { useCallback, useEffect, useState } from 'react';

export const useWindowDimensions = () => {
  const hasWindow = typeof window !== 'undefined';

  const getWindowDimensions = useCallback(() => {
    const width = hasWindow ? window.innerWidth : null;
    const height = hasWindow ? window.innerHeight : null;
    return {
      width,
      height,
    };
  }, [hasWindow]);

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  const handleResize = useCallback(
    () => setWindowDimensions(getWindowDimensions()),
    [getWindowDimensions]
  );

  useEffect(() => {
    if (hasWindow) {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [hasWindow, getWindowDimensions, handleResize]);

  return windowDimensions;
};
