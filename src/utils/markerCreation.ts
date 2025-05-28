
import mapboxgl from 'mapbox-gl';
import { ParkingSpot } from '@/mock/parkingData';
import { Coordinates } from '@/utils/locationUtils';
import { createMarkerElement, updateMarkerColor } from './markerStyles';
import { generatePopupContent, getSpotStatus } from './popupContent';

export const createParkingMarker = (
  map: mapboxgl.Map,
  spot: ParkingSpot,
  isSelected: boolean,
  userLocation: Coordinates | null,
  onMarkerClick: (spot: ParkingSpot) => void
): { marker: mapboxgl.Marker; popup: mapboxgl.Popup } => {
  console.log(`Creating marker for spot: ${spot.name} at`, spot.location);
  
  const el = createMarkerElement(isSelected);
  const color = updateMarkerColor(el, spot.availableSpaces, spot.totalSpaces);
  const { status } = getSpotStatus(spot.availableSpaces, spot.totalSpaces);
  
  const popupContent = generatePopupContent(spot, userLocation, color, status);
  const popup = new mapboxgl.Popup({ 
    offset: 25, 
    closeButton: false,
    className: 'parking-popup'
  }).setHTML(popupContent);

  const marker = new mapboxgl.Marker(el)
    .setLngLat([spot.location.lng, spot.location.lat])
    .setPopup(popup)
    .addTo(map);

  el.addEventListener('click', () => {
    console.log('Marker clicked:', spot.name);
    onMarkerClick(spot);
  });

  return { marker, popup };
};

export const updateMarkerSelection = (
  marker: mapboxgl.Marker,
  isSelected: boolean
) => {
  const el = marker.getElement();
  el.style.animation = isSelected ? 'pulse 1.5s infinite' : '';
  el.style.border = isSelected ? '3px solid #3B82F6' : '3px solid white';
};
