
import React, { useState, useCallback } from 'react';
import MapView from '../components/MapView';
import CardScroller from '../components/CardScroller';
import NavBarWithTheme from '@/components/NavBarWithTheme';
import MobileViewToggle from '@/components/MobileViewToggle';
import ResultsHeader from '@/components/ResultsHeader';
import { useFilterLogic } from '@/hooks/useFilterLogic';
import { useLocationManager } from '@/hooks/useLocationManager';

const Index = () => {
  const [showMapOnMobile, setShowMapOnMobile] = useState<boolean>(false);
  const [mapSearchFunction, setMapSearchFunction] = useState<((query: string) => Promise<void>) | null>(null);
  
  // Use custom hooks for state management
  const { userLocation, mapboxToken } = useLocationManager();
  const {
    filteredSpots,
    selectedSpot,
    setSelectedSpot,
    searchQuery,
    setSearchQuery,
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime,
    activeFilters,
    setActiveFilters,
    handleSearchLocation
  } = useFilterLogic(userLocation);

  // Handle place search from navbar
  const handlePlaceSearch = useCallback(async (query: string) => {
    if (mapSearchFunction) {
      await mapSearchFunction(query);
    }
  }, [mapSearchFunction]);

  // Receive search function from MapView
  const handleMapSearchReady = useCallback((searchFn: (query: string) => Promise<void>) => {
    setMapSearchFunction(() => searchFn);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navigation Bar with search and filters */}
      <NavBarWithTheme 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
        activeFilters={activeFilters}
        setActiveFilters={setActiveFilters}
        onPlaceSearch={handlePlaceSearch}
      />
      
      {/* Mobile View Toggle */}
      <MobileViewToggle 
        showMapOnMobile={showMapOnMobile}
        setShowMapOnMobile={setShowMapOnMobile}
      />
      
      {/* Main content */}
      <div className="flex flex-col lg:flex-row flex-1 h-full overflow-hidden">
        {/* Left side: Cards */}
        <div className={`${showMapOnMobile ? 'hidden' : 'flex'} lg:flex lg:w-2/5 xl:w-1/3 overflow-hidden flex-col`}>
          {/* Results count */}
          <ResultsHeader 
            spotsCount={filteredSpots.length}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
          />
          
          {/* Scrollable cards */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 dark:bg-gray-900">
            <CardScroller
              parkingSpots={filteredSpots}
              selectedSpot={selectedSpot}
              setSelectedSpot={setSelectedSpot}
              userLocation={userLocation}
              airbnbStyle={true}
            />
          </div>
        </div>
        
        {/* Right side: Map */}
        <div className={`${!showMapOnMobile ? 'hidden' : 'flex'} lg:flex flex-col lg:w-3/5 xl:w-2/3 h-[calc(100vh-170px)] lg:h-full relative`}>
          <MapView
            parkingSpots={filteredSpots}
            selectedSpot={selectedSpot}
            setSelectedSpot={setSelectedSpot}
            mapboxToken={mapboxToken}
            onPlaceSearch={handleMapSearchReady}
            onLocationFound={handleSearchLocation}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
