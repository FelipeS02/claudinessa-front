'use client';

import Leaflet from 'leaflet';
import * as ReactLeaflet from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import { cn } from '@/lib/utils';
import { useEffect } from 'react';
import { useTheme } from 'next-themes';

const { MapContainer } = ReactLeaflet;

const init = async () => {
  delete Leaflet.Icon.Default.prototype._getIconUrl;
  Leaflet.Icon.Default.mergeOptions({
    iconRetinaUrl: 'images/leaflet/marker-icon-2x.png',
    iconUrl: 'images/leaflet/marker-icon.png',
    shadowUrl: 'images/leaflet/marker-shadow.png',
  });
};

const Map = ({ children, className, width, height, ...rest }) => {
  const { resolvedTheme } = useTheme();
  const layer =
    resolvedTheme === 'dark'
      ? 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
      : 'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png';

  useEffect(() => {
    init();
  }, []);

  return (
    <MapContainer className={cn(className, 'w-full h-full')} {...rest}>
      {children(ReactLeaflet, Leaflet, layer)}
    </MapContainer>
  );
};

export default Map;
