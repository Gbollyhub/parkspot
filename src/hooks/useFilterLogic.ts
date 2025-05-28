
import { useState, useEffect, useCallback } from 'react';
import { parkingSpots, ParkingSpot } from '../mock/parkingData';
import { Coordinates, calculateDistance } from '@/utils/locationUtils';

export const useFilterLogic = (userLocation: Coordinates | null) => {
  const [filteredSpots, setFilteredSpots] = useState<ParkingSpot[]>(parkingSpots);
  const [selectedSpot, setSelectedSpot] = useState<ParkingSpot | null>(null);
  const [searchLocation, setSearchLocation] = useState<Coordinates | null>(null);
  
  // Filter states
  const minPrice = Math.min(...parkingSpots.map(spot => spot.pricePerHour));
  const maxPrice = Math.max(...parkingSpots.map(spot => spot.pricePerHour));
  const [priceRange, setPriceRange] = useState<[number, number]>([minPrice, maxPrice]);
  const [showAvailable, setShowAvailable] = useState<boolean>(false);
  
  // Navigation search and filter states
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>("12:00");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  // Function to handle search location updates - use useCallback to prevent recreating
  const handleSearchLocation = useCallback((location: Coordinates) => {
    console.log('handleSearchLocation called with:', location);
    const normalizedLocation = {
      lat: location.lat,
      lng: location.lng,
      latitude: location.lat,
      longitude: location.lng
    };
    console.log('Setting search location to:', normalizedLocation);
    setSearchLocation(normalizedLocation);
  }, []);

  // Apply filters - only filter by search location when there's an actual search query
  useEffect(() => {
    console.log('=== FILTER EFFECT TRIGGERED ===');
    console.log('Search location:', searchLocation);
    console.log('Search query:', searchQuery);
    console.log('Total parking spots:', parkingSpots.length);
    
    let spots = [...parkingSpots];
    
    // Only filter by search location if there's an actual search query
    if (searchLocation && searchQuery.trim() !== "") {
      console.log('Filtering by search location, total spots before filter:', spots.length);
      spots = spots.filter(spot => {
        const distance = calculateDistance(searchLocation, spot.location);
        console.log(`Distance from search to ${spot.name}: ${distance}km`);
        return distance <= 10; // Show spots within 10km of searched location
      });
      console.log('Spots after search location filter:', spots.length);
    } else {
      console.log('No active search query, showing all spots');
    }
    
    // Filter by price
    spots = spots.filter(spot => 
      spot.pricePerHour >= priceRange[0] && 
      spot.pricePerHour <= priceRange[1]
    );
    
    // Filter by availability
    if (showAvailable || activeFilters.includes('available')) {
      spots = spots.filter(spot => spot.availableSpaces > 0);
    }

    // Apply active filters
    if (activeFilters.includes('covered')) {
      spots = spots.filter(spot => spot.covered);
    }
    
    if (activeFilters.includes('ev-charging')) {
      spots = spots.filter(spot => spot.evCharging);
    }
    
    if (activeFilters.includes('garage')) {
      spots = spots.filter(spot => spot.type === 'garage');
    }
    
    if (activeFilters.includes('nearby')) {
      // Use either search location or user location for nearby filter
      const referenceLocation = searchLocation || userLocation;
      if (referenceLocation) {
        spots = spots.filter(spot => {
          const distance = calculateDistance(referenceLocation, spot.location);
          return distance < 2; // Within 2km for "nearby"
        });
      } else {
        // If no reference location, just show a random subset
        spots = spots.filter(() => Math.random() > 0.6);
      }
    }
    
    console.log('Final filtered spots count:', spots.length);
    console.log('=== END FILTER EFFECT ===');
    setFilteredSpots(spots);
    
    // Reset selected spot if it's no longer in filtered results
    if (selectedSpot && !spots.find(s => s.id === selectedSpot.id)) {
      setSelectedSpot(null);
    }
  }, [searchLocation, searchQuery, priceRange, showAvailable, selectedSpot, selectedDate, selectedTime, activeFilters, userLocation]);

  return {
    filteredSpots,
    selectedSpot,
    setSelectedSpot,
    priceRange,
    setPriceRange,
    showAvailable,
    setShowAvailable,
    searchQuery,
    setSearchQuery,
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime,
    activeFilters,
    setActiveFilters,
    minPrice,
    maxPrice,
    handleSearchLocation
  };
};
