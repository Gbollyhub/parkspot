
import { useRef, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import { ParkingSpot } from '@/mock/parkingData';
import { Coordinates } from '@/utils/locationUtils';
import { MarkerManager } from '@/utils/markerManager';

export const useMapMarkers = () => {
  const markerManager = useRef<MarkerManager>(new MarkerManager());

  const updateMarkersWithDistance = useCallback((userPos: Coordinates, parkingSpots: ParkingSpot[]) => {
    markerManager.current.updateMarkersWithDistance(userPos, parkingSpots);
  }, []);

  const createMarkers = useCallback((
    map: mapboxgl.Map,
    parkingSpots: ParkingSpot[],
    selectedSpot: ParkingSpot | null,
    userLocation: Coordinates | null,
    onMarkerClick: (spot: ParkingSpot) => void
  ) => {
    console.log('useMapMarkers: createMarkers called with', parkingSpots.length, 'spots');
    markerManager.current.createMarkers(map, parkingSpots, selectedSpot, userLocation, onMarkerClick);
  }, []);

  const updateSelectedMarker = useCallback((selectedSpot: ParkingSpot | null) => {
    markerManager.current.updateSelectedMarker(selectedSpot);
  }, []);

  const addUserLocationMarker = useCallback((map: mapboxgl.Map, position: Coordinates) => {
    markerManager.current.addUserLocationMarker(map, position);
  }, []);

  return {
    markers: markerManager.current.getMarkers(),
    popups: markerManager.current.getPopups(),
    updateMarkersWithDistance,
    createMarkers,
    updateSelectedMarker,
    addUserLocationMarker
  };
};
