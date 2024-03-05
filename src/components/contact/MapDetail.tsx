import React, { FC } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import iconMarker from 'leaflet/dist/images/marker-icon.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import L from 'leaflet';
import { Container } from '@mui/material';

const icon = L.icon({
  iconRetinaUrl: iconRetina,
  iconUrl: iconMarker,
  iconSize: [20, 30],
});

interface MapProps {
  center: [number, number];
  zoom: number;
  name: string;
}

const MapDetail = () => {
  return (
    <Container component='main' maxWidth='sm'>
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: '590px', borderRadius: '0.5rem' }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <Marker position={[51.505, -0.09]} icon={icon}>
          <Popup>dd</Popup>
        </Marker>
      </MapContainer>
    </Container>
  );
};

export default MapDetail;
