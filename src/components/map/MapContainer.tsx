
import React, { useRef, useState } from 'react';
import { ParkingSpot } from '@/mock/parkingData';
import ParkingDetailsModal from '../ParkingDetailsModal';
import MapControls from './MapControls';
import MapInitializer from './MapInitializer';
import MapEffects from './MapEffects';
import MapEventHandlers from './MapEventHandlers';
import { useBooking } from '@/context/BookingContext';
import { useMapTheme } from '@/hooks/useMapTheme';
import { useUserLocation } from '@/hooks/useUserLocation';
import { Coordinates } from '@/utils/locationUtils';

interface MapContainerProps {
  parkingSpots: ParkingSpot[];
  selectedSpot: ParkingSpot | null;
  setSelectedSpot: (spot: ParkingSpot | null) => void;
  mapboxToken: string;
  onPlaceSearch?: (searchFn: (query: string) => Promise<void>) => void;
  onLocationFound?: (location: Coordinates) => void;
}

const MapContainer: React.FC<MapContainerProps> = ({
  parkingSpots,
  selectedSpot,
  setSelectedSpot,
  mapboxToken,
  onPlaceSearch,
  onLocationFound
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const { isSpotBooked } = useBooking();
  
  const { theme } = useMapTheme();
  const { userLocation, isLocating, handleLocateUser } = useUserLocation();

  const handleMarkerClick = (spot: ParkingSpot) => {
    setSelectedSpot(spot);
    setIsModalOpen(true);
  };

  const handleResetView = () => {
    if (!map.current) return;
    
    const defaultCenter: [number, number] = [-0.1278, 51.5074];
    map.current.flyTo({
      center: defaultCenter,
      zoom: 12,
      essential: true,
      duration: 1000
    });
    
    setSelectedSpot(null);
  };

  const onLocateUser = async () => {
    await handleLocateUser(map.current, (position) => {
      // Location update callback will be handled in MapEffects
    });
  };

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="absolute inset-0 rounded-lg" />
      
      <MapInitializer
        mapContainer={mapContainer}
        map={map}
        mapboxToken={mapboxToken}
        setMapLoaded={setMapLoaded}
      />

      <MapEffects
        map={map}
        mapLoaded={mapLoaded}
        parkingSpots={parkingSpots}
        selectedSpot={selectedSpot}
        userLocation={userLocation}
        handleMarkerClick={handleMarkerClick}
      />

      <MapEventHandlers
        map={map}
        onPlaceSearch={onPlaceSearch}
        onLocationFound={onLocationFound}
      />
      
      {mapLoaded && (
        <MapControls
          onLocateUser={onLocateUser}
          onResetView={handleResetView}
          isLocating={isLocating}
          theme={theme}
        />
      )}
      
      {selectedSpot && (
        <ParkingDetailsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          parkingSpot={selectedSpot}
          userLocation={userLocation}
          isBooked={isSpotBooked(selectedSpot.id)}
        />
      )}
      
      {!mapboxToken && (
        <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} rounded-lg flex items-center justify-center`}>
          <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} text-center p-4`}>
            Please enter a Mapbox token to display the map
          </p>
        </div>
      )}

      {mapboxToken && !mapLoaded && (
        <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} rounded-lg flex items-center justify-center`}>
          <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} text-center p-4`}>
            Loading map...
          </p>
        </div>
      )}
    </div>
  );
};

export default MapContainer;
