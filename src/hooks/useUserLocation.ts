
import { useState, useCallback } from 'react';
import { getUserLocation, Coordinates } from '@/utils/locationUtils';
import { toast } from '@/components/ui/sonner';

export const useUserLocation = () => {
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
  const [isLocating, setIsLocating] = useState(false);

  const handleLocateUser = useCallback(async (map: mapboxgl.Map | null, onLocationUpdate?: (position: Coordinates) => void) => {
    if (!map) return;
    
    setIsLocating(true);
    try {
      const position = await getUserLocation();
      setUserLocation(position);
      
      map.flyTo({
        center: [position.lng, position.lat] as [number, number],
        zoom: 14,
        essential: true,
        duration: 1000
      });
      
      toast.success("Located you successfully!");
      
      if (onLocationUpdate) {
        onLocationUpdate(position);
      }
      
    } catch (error) {
      console.error("Error getting user location:", error);
      toast.error("Could not access your location. Please check your browser settings.");
    } finally {
      setIsLocating(false);
    }
  }, []);

  return {
    userLocation,
    setUserLocation,
    isLocating,
    handleLocateUser
  };
};
