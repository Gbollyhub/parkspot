
import { ParkingSpot } from '@/mock/parkingData';
import { Coordinates, calculateDistance } from '@/utils/locationUtils';

export const generatePopupContent = (
  spot: ParkingSpot, 
  userLocation: Coordinates | null,
  color: string,
  status: string
): string => {
  const distanceHtml = userLocation ? 
    `<div class="text-xs text-gray-500 flex items-center gap-1 mt-1">
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
      ${calculateDistance(userLocation, spot.location)} km from you
    </div>` : '';

  return `
    <div class="p-3 rounded-lg">
      <h3 class="font-semibold text-gray-800 text-base mb-1">${spot.name}</h3>
      <div class="flex items-center gap-2 mb-1">
        <span class="font-bold text-primary">£${spot.pricePerHour.toFixed(2)}</span>
        <span class="text-sm text-gray-600">per hour</span>
      </div>
      <div class="flex justify-between items-center mb-1">
        <span class="text-sm">${spot.availableSpaces}/${spot.totalSpaces} spaces</span>
        <span class="text-xs px-2 py-1 rounded-full" 
          style="background-color: ${color}20; color: ${color}; font-weight: 600;">
          ${status}
        </span>
      </div>
      ${distanceHtml}
    </div>
  `;
};

export const getSpotStatus = (availableSpaces: number, totalSpaces: number): { color: string; status: string } => {
  if (availableSpaces === 0) {
    return { color: '#EF4444', status: 'Full' };
  } else if (availableSpaces / totalSpaces < 0.2) {
    return { color: '#F59E0B', status: 'Limited' };
  }
  return { color: '#10B981', status: 'Available' };
};
