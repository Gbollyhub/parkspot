
import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { toast } from '@/components/ui/sonner';
import { useMapTheme } from '@/hooks/useMapTheme';

interface MapInitializerProps {
  mapContainer: React.RefObject<HTMLDivElement>;
  map: React.MutableRefObject<mapboxgl.Map | null>;
  mapboxToken: string;
  setMapLoaded: (loaded: boolean) => void;
}

const MapInitializer: React.FC<MapInitializerProps> = ({
  mapContainer,
  map,
  mapboxToken,
  setMapLoaded
}) => {
  const { theme, getMapStyle } = useMapTheme();
  const defaultCenter: [number, number] = [-0.1278, 51.5074]; // London coordinates

  // Initialize map only once
  useEffect(() => {
    if (!mapContainer.current || map.current || !mapboxToken) return;

    try {
      mapboxgl.accessToken = mapboxToken;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: getMapStyle(theme),
        center: defaultCenter,
        zoom: 12,
        antialias: true,
        preserveDrawingBuffer: true
      });

      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
      map.current.addControl(new mapboxgl.FullscreenControl(), 'top-right');

      map.current.on('load', () => {
        setMapLoaded(true);
        console.log('Map loaded successfully');
      });

      map.current.on('error', (e) => {
        console.error('Map error:', e);
        toast.error('Map failed to load. Please check your connection.');
      });

    } catch (error) {
      console.error('Error initializing map:', error);
      toast.error('Failed to initialize map');
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
      setMapLoaded(false);
    };
  }, [mapboxToken]);

  return null;
};

export default MapInitializer;
