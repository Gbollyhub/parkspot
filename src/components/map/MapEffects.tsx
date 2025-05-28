
import React, { useEffect, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import { ParkingSpot } from '@/mock/parkingData';
import { Coordinates } from '@/utils/locationUtils';
import { useMapMarkers } from '@/hooks/useMapMarkers';
import { useMapTheme } from '@/hooks/useMapTheme';

interface MapEffectsProps {
  map: React.MutableRefObject<mapboxgl.Map | null>;
  mapLoaded: boolean;
  parkingSpots: ParkingSpot[];
  selectedSpot: ParkingSpot | null;
  userLocation: Coordinates | null;
  handleMarkerClick: (spot: ParkingSpot) => void;
}

const MapEffects: React.FC<MapEffectsProps> = ({
  map,
  mapLoaded,
  parkingSpots,
  selectedSpot,
  userLocation,
  handleMarkerClick
}) => {
  const { currentTheme, getMapStyle } = useMapTheme();
  const { 
    updateMarkersWithDistance, 
    createMarkers, 
    updateSelectedMarker, 
    addUserLocationMarker 
  } = useMapMarkers();

  // Memoize the marker click handler to prevent recreating it
  const memoizedHandleMarkerClick = useCallback((spot: ParkingSpot) => {
    handleMarkerClick(spot);
  }, [handleMarkerClick]);

  // Handle theme changes with immediate effect
  useEffect(() => {
    if (!map.current || !mapLoaded) return;
    
    console.log('Applying theme change to map:', currentTheme);
    
    try {
      if (map.current) {
        map.current.setStyle(getMapStyle(currentTheme));
        
        // Wait for style to load before recreating markers
        const handleStyleLoad = () => {
          if (parkingSpots.length > 0 && map.current) {
            console.log('Recreating markers after theme change');
            createMarkers(map.current, parkingSpots, selectedSpot, userLocation, memoizedHandleMarkerClick);
          }
        };

        map.current.once('styledata', handleStyleLoad);
      }
    } catch (error) {
      console.error('Error changing map style:', error);
    }
  }, [currentTheme, mapLoaded, getMapStyle, parkingSpots, selectedSpot, userLocation, createMarkers, memoizedHandleMarkerClick]);

  // Add markers for parking spots with debouncing - only when spots change
  useEffect(() => {
    if (!map.current || !parkingSpots.length || !mapLoaded) {
      console.log('MapEffects: Cannot create markers', {
        hasMap: !!map.current,
        spotsLength: parkingSpots.length,
        mapLoaded
      });
      return;
    }

    const timeoutId = setTimeout(() => {
      if (!map.current) return;
      console.log('MapEffects: Creating markers for', parkingSpots.length, 'spots');
      createMarkers(map.current, parkingSpots, selectedSpot, userLocation, memoizedHandleMarkerClick);
    }, 50);

    return () => clearTimeout(timeoutId);
  }, [parkingSpots, mapLoaded, createMarkers, memoizedHandleMarkerClick]);

  // Handle selected spot change
  useEffect(() => {
    if (!map.current || !mapLoaded) return;
    
    const timeoutId = setTimeout(() => {
      if (!map.current) return;
      
      if (selectedSpot) {
        map.current.flyTo({
          center: [selectedSpot.location.lng, selectedSpot.location.lat],
          zoom: 15,
          essential: true,
          duration: 1000
        });
      }

      updateSelectedMarker(selectedSpot);
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [selectedSpot, updateSelectedMarker, mapLoaded]);

  // Handle user location updates
  useEffect(() => {
    if (!map.current || !userLocation) return;
    
    console.log('MapEffects: Adding user location marker');
    addUserLocationMarker(map.current, userLocation);
    if (parkingSpots.length > 0) {
      updateMarkersWithDistance(userLocation, parkingSpots);
    }
  }, [userLocation, addUserLocationMarker, updateMarkersWithDistance, parkingSpots]);

  return null;
};

export default MapEffects;
