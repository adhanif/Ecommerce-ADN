import React from 'react';
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

const MapDetail = () => {
  return (
    <Container component='main' maxWidth='sm'>
      <MapContainer
        center={[60.1699, 24.9384]}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: '590px', borderRadius: '0.5rem' }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <Marker position={[60.1699, 24.9384]} icon={icon}>
          <Popup>E-commerce Fashion ADN Oy</Popup>
        </Marker>
      </MapContainer>
    </Container>
  );
};

export default MapDetail;
