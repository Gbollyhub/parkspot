
import React, { useEffect, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import { useMapSearch } from '@/hooks/useMapSearch';
import { useLocationManager } from '@/hooks/useLocationManager';
import { Coordinates } from '@/utils/locationUtils';

interface MapEventHandlersProps {
  map: React.MutableRefObject<mapboxgl.Map | null>;
  onPlaceSearch?: (searchFn: (query: string) => Promise<void>) => void;
  onLocationFound?: (location: Coordinates) => void;
}

const MapEventHandlers: React.FC<MapEventHandlersProps> = ({
  map,
  onPlaceSearch,
  onLocationFound
}) => {
  const { mapboxToken } = useLocationManager();
  
  const handleLocationFound = useCallback((location: Coordinates) => {
    console.log('MapEventHandlers: Location found, calling onLocationFound:', location);
    if (onLocationFound) {
      onLocationFound(location);
    }
  }, [onLocationFound]);
  
  const { handlePlaceSearch } = useMapSearch(mapboxToken, handleLocationFound);

  // Expose search function to parent component
  useEffect(() => {
    if (onPlaceSearch) {
      onPlaceSearch((query: string) => handlePlaceSearch(map.current, query));
    }
  }, [onPlaceSearch, handlePlaceSearch]);

  return null;
};

export default MapEventHandlers;
