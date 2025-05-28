
export interface Coordinates {
  lat: number;
  lng: number;
  latitude?: number; // Added for compatibility with filtering code
  longitude?: number; // Added for compatibility with filtering code
}

export const getUserLocation = (): Promise<Coordinates> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            latitude: position.coords.latitude, // Added for compatibility
            longitude: position.coords.longitude, // Added for compatibility
          });
        },
        (error) => {
          reject(error);
        }
      );
    }
  });
};

export const calculateDistance = (point1: Coordinates, point2: Coordinates): number => {
  // Haversine formula for calculating distance between two points on Earth
  const R = 6371; // Earth's radius in km
  const dLat = (point2.lat - point1.lat) * Math.PI / 180;
  const dLon = (point2.lng - point1.lng) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(point1.lat * Math.PI / 180) * Math.cos(point2.lat * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c;
  return Math.round(distance * 10) / 10; // Return distance in km with one decimal place
};
