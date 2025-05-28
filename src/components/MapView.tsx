
import React from 'react';
import { ParkingSpot } from '../mock/parkingData';
import MapContainer from './map/MapContainer';
import { Coordinates } from '@/utils/locationUtils';

interface MapViewProps {
  parkingSpots: ParkingSpot[];
  selectedSpot: ParkingSpot | null;
  setSelectedSpot: (spot: ParkingSpot | null) => void;
  mapboxToken: string;
  onPlaceSearch?: (searchFn: (query: string) => Promise<void>) => void;
  onLocationFound?: (location: Coordinates) => void;
}

const MapView: React.FC<MapViewProps> = (props) => {
  return <MapContainer {...props} />;
};

export default MapView;
