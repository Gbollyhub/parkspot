
import { useState, useEffect } from 'react';
import { Coordinates } from '@/utils/locationUtils';

export const useLocationManager = () => {
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>('YOUR_MAPBOX_ACCESS_TOKEN');

  // Check for mapbox token in localStorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem('mapboxToken');
    if (savedToken) {
      setMapboxToken(savedToken);
    }
    
    // Simulate getting user location
    // In a real app, you would use the browser's geolocation API
    setTimeout(() => {
      setUserLocation({
        lat: 51.5074,
        lng: -0.1278,
        latitude: 51.5074,
        longitude: -0.1278
      });
    }, 1000);
  }, []);

  // Save token to localStorage when changed
  useEffect(() => {
    if (mapboxToken) {
      localStorage.setItem('mapboxToken', mapboxToken);
    }
  }, [mapboxToken]);

  return {
    userLocation,
    setUserLocation,
    mapboxToken,
    setMapboxToken
  };
};
