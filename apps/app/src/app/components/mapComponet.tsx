// components/MapComponent.tsx
import React from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '300px',
};

const defaultCenter = {
  lat: 10.4806,
  lng: -66.9036,
};

interface MapComponentProps {
  center: { lat: number; lng: number };
}

const MapComponent: React.FC<MapComponentProps> = ({ center }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'TU_API_KEY_AQUI', // ← coloca tu key
  });

  if (!isLoaded) return <div>Cargando mapa...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={14}
    >
      <Marker position={center} />
    </GoogleMap>
  );
};

export default MapComponent;
