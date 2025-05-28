
import mapboxgl from 'mapbox-gl';
import { ParkingSpot } from '@/mock/parkingData';
import { Coordinates, calculateDistance } from '@/utils/locationUtils';
import { createParkingMarker, updateMarkerSelection } from './markerCreation';
import { createUserLocationElement } from './markerStyles';
import { generatePopupContent, getSpotStatus } from './popupContent';

export class MarkerManager {
  private markers: { [key: string]: mapboxgl.Marker } = {};
  private popups: { [key: string]: mapboxgl.Popup } = {};

  clearParkingMarkers() {
    Object.entries(this.markers).forEach(([id, marker]) => {
      if (id !== 'user-location') {
        console.log('Removing existing marker:', id);
        marker.remove();
        delete this.markers[id];
      }
    });
    
    Object.keys(this.popups).forEach(id => {
      if (id !== 'user-location') {
        delete this.popups[id];
      }
    });
  }

  createMarkers(
    map: mapboxgl.Map,
    parkingSpots: ParkingSpot[],
    selectedSpot: ParkingSpot | null,
    userLocation: Coordinates | null,
    onMarkerClick: (spot: ParkingSpot) => void
  ) {
    console.log('Creating markers for', parkingSpots.length, 'parking spots');
    console.log('Map object:', map);
    console.log('Selected spot:', selectedSpot?.id);
    
    if (!map || parkingSpots.length === 0) {
      console.log('No map or no parking spots, skipping marker creation');
      return;
    }
    
    this.clearParkingMarkers();
    
    parkingSpots.forEach((spot, index) => {
      console.log(`Creating marker ${index + 1}/${parkingSpots.length} for spot:`, spot.name, 'at', spot.location);
      
      try {
        const isSelected = selectedSpot?.id === spot.id;
        const { marker, popup } = createParkingMarker(
          map, 
          spot, 
          isSelected, 
          userLocation, 
          onMarkerClick
        );

        this.markers[spot.id] = marker;
        this.popups[spot.id] = popup;
        
        console.log('Successfully created marker for:', spot.name);
      } catch (error) {
        console.error('Error creating marker for spot:', spot.name, error);
      }
    });
    
    console.log('Finished creating markers. Total markers:', Object.keys(this.markers).length);
  }

  updateSelectedMarker(selectedSpot: ParkingSpot | null) {
    console.log('Updating selected marker:', selectedSpot?.name);
    
    Object.entries(this.markers).forEach(([id, marker]) => {
      if (id !== 'user-location') {
        const isSelected = id === selectedSpot?.id;
        updateMarkerSelection(marker, isSelected);
      }
    });
    
    if (selectedSpot) {
      const selectedMarker = this.markers[selectedSpot.id];
      if (selectedMarker) {
        selectedMarker.togglePopup();
      }
    }
  }

  updateMarkersWithDistance(userPos: Coordinates, parkingSpots: ParkingSpot[]) {
    console.log('Updating markers with distance for', parkingSpots.length, 'spots');
    parkingSpots.forEach(spot => {
      const distance = calculateDistance(userPos, spot.location);
      
      if (this.popups[spot.id]) {
        const { color, status } = getSpotStatus(spot.availableSpaces, spot.totalSpaces);
        const popupContent = generatePopupContent(spot, userPos, color, status);
        this.popups[spot.id].setHTML(popupContent);
      }
    });
  }

  addUserLocationMarker(map: mapboxgl.Map, position: Coordinates) {
    console.log('Adding user location marker at:', position);
    
    if (this.markers['user-location']) {
      this.markers['user-location'].remove();
    }
    
    const el = createUserLocationElement();
    this.markers['user-location'] = new mapboxgl.Marker(el)
      .setLngLat([position.lng, position.lat])
      .addTo(map);
  }

  getMarkers() {
    return this.markers;
  }

  getPopups() {
    return this.popups;
  }
}
