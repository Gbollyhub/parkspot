
import React, { useRef, useEffect, useState } from 'react';
import { ParkingSpot } from '../mock/parkingData';
import ParkingCard from './ParkingCard';
import { Coordinates, calculateDistance } from '@/utils/locationUtils';
import ParkingDetailsModal from './ParkingDetailsModal';
import { useBooking } from '@/context/BookingContext';

interface CardScrollerProps {
  parkingSpots: ParkingSpot[];
  selectedSpot: ParkingSpot | null;
  setSelectedSpot: (spot: ParkingSpot | null) => void;
  userLocation?: Coordinates | null;
  airbnbStyle?: boolean;
}

const CardScroller: React.FC<CardScrollerProps> = ({ 
  parkingSpots, 
  selectedSpot, 
  setSelectedSpot,
  userLocation,
  airbnbStyle = false
}) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isSpotBooked } = useBooking();
  
  // Scroll to selected card when selection changes
  useEffect(() => {
    if (scrollerRef.current && selectedSpot) {
      const selectedCardIndex = parkingSpots.findIndex(spot => spot.id === selectedSpot.id);
      if (selectedCardIndex >= 0) {
        const cardWidth = 288; // 272px card width + 16px gap
        scrollerRef.current.scrollTo({
          left: cardWidth * selectedCardIndex,
          behavior: 'smooth'
        });
      }
    }
  }, [selectedSpot, parkingSpots]);

  // Empty state component
  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="w-16 h-16 mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
        <svg className="w-8 h-8 text-gray-400 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
        No parking spots found
      </h3>
      <p className="text-gray-500 dark:text-gray-400 max-w-sm">
        Try adjusting your filters or search in a different area to find available parking spaces.
      </p>
    </div>
  );

  // If using airbnb style, render cards as a vertical list
  if (airbnbStyle) {
    return (
      <div className="space-y-6 w-full">
        {parkingSpots.length === 0 ? (
          <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow">
            <EmptyState />
          </div>
        ) : (
          parkingSpots.map((spot) => (
            <ParkingCard
              key={spot.id}
              spot={spot}
              isSelected={selectedSpot?.id === spot.id}
              onClick={() => setSelectedSpot(spot)}
              onViewDetails={() => {
                setSelectedSpot(spot);
                setIsModalOpen(true);
              }}
              userLocation={userLocation}
              distance={userLocation ? calculateDistance(userLocation, spot.location) : undefined}
              airbnbStyle={true}
            />
          ))
        )}
        
        {/* Parking Details Modal */}
        {selectedSpot && (
          <ParkingDetailsModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            parkingSpot={selectedSpot}
            userLocation={userLocation}
            isBooked={isSpotBooked(selectedSpot.id)}
          />
        )}
      </div>
    );
  }

  // Original horizontal scroll view
  return (
    <div className="w-full overflow-hidden bg-gray-100/60 backdrop-blur-sm rounded-t-xl shadow-lg">
      <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">Available Parking Spots</h2>
        <p className="text-sm text-gray-500">{parkingSpots.length} locations</p>
      </div>
      
      <div 
        ref={scrollerRef}
        className="flex gap-4 p-4 overflow-x-auto lg:overflow-x-auto overflow-y-auto snap-x scroll-px-4 scroll-smooth"
      >
        {parkingSpots.length === 0 ? (
          <div className="w-full">
            <EmptyState />
          </div>
        ) : (
          parkingSpots.map((spot) => (
            <div key={spot.id} className="snap-start">
              <ParkingCard
                spot={spot}
                isSelected={selectedSpot?.id === spot.id}
                onClick={() => setSelectedSpot(spot)}
                onViewDetails={() => {
                  setSelectedSpot(spot);
                  setIsModalOpen(true);
                }}
                userLocation={userLocation}
                distance={userLocation ? calculateDistance(userLocation, spot.location) : undefined}
              />
            </div>
          ))
        )}
      </div>
      
      {/* Parking Details Modal */}
      {selectedSpot && (
        <ParkingDetailsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          parkingSpot={selectedSpot}
          userLocation={userLocation}
          isBooked={isSpotBooked(selectedSpot.id)}
        />
      )}
    </div>
  );
};

export default CardScroller;
