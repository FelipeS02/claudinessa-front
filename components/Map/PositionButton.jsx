'use client';

import { useCallback, useEffect, useState } from 'react';
import L from 'leaflet';
import {  Marker, Popup, useMap } from 'react-leaflet';

const PositionButton = () => {
  const [position, setPosition] = useState(null);

  const map = useMap();

  const getPosition = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const pos = [coords.latitude, coords.longitude];
        setPosition(pos);
        const markerArray = [
          L.marker([-34.787859813247074, -58.16018067727867]),
          L.marker(pos),
        ];
        const group = L.featureGroup(markerArray);
        map.flyToBounds(group.getBounds());
      });
    }
  }, [map]);

  useEffect(() => {
    getPosition();
  }, [getPosition]);

  return (
    <>
      {position ? (
        <Marker position={position} radius={200}>
          <Popup>Esta es tu ubicación aproximada</Popup>
        </Marker>
      ) : null}
    </>
  );
};

export default PositionButton;
