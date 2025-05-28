
import { useCallback } from 'react';
import { toast } from '@/components/ui/sonner';
import { Coordinates } from '@/utils/locationUtils';

export const useMapSearch = (mapboxToken: string, onLocationFound?: (location: Coordinates) => void) => {
  const handlePlaceSearch = useCallback(async (map: mapboxgl.Map | null, query: string) => {
    if (!map || !mapboxToken) return;
    
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${mapboxToken}&types=place,locality,district,region,country&limit=1`
      );
      
      if (!response.ok) {
        throw new Error('Search request failed');
      }
      
      const data = await response.json();
      
      if (data.features && data.features.length > 0) {
        const feature = data.features[0];
        const [lng, lat] = feature.center;
        
        map.flyTo({
          center: [lng, lat],
          zoom: feature.bbox ? 12 : 14,
          essential: true,
          duration: 2000
        });
        
        // Notify about the found location
        if (onLocationFound) {
          onLocationFound({
            lat,
            lng,
            latitude: lat,
            longitude: lng
          });
        }
        
        toast.success(`Found: ${feature.place_name}`);
      } else {
        toast.error("Location not found. Please try a different search term.");
      }
    } catch (error) {
      console.error('Search error:', error);
      toast.error("Error searching for location. Please try again.");
    }
  }, [mapboxToken, onLocationFound]);

  return { handlePlaceSearch };
};
