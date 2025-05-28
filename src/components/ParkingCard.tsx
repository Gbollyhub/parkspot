
import React from 'react';
import { ParkingSpot } from '../mock/parkingData';
import { Coordinates } from '@/utils/locationUtils';
import { useBooking } from '@/context/BookingContext';
import { Star } from 'lucide-react';

interface ParkingCardProps {
  spot: ParkingSpot;
  isSelected: boolean;
  onClick: () => void;
  onViewDetails: () => void;
  userLocation?: Coordinates | null;
  distance?: number;
  airbnbStyle?: boolean;
}

const ParkingCard: React.FC<ParkingCardProps> = ({ 
  spot, 
  isSelected, 
  onClick,
  onViewDetails,
  distance,
  airbnbStyle = false
}) => {
  const { isSpotBooked } = useBooking();
  const isBooked = isSpotBooked(spot.id);
  
  // Calculate availability status and color
  const getAvailabilityStatus = () => {
    if (spot.availableSpaces === 0) return { text: 'Full', color: 'parking-full' };
    if (spot.availableSpaces / spot.totalSpaces < 0.2) return { text: 'Limited', color: 'parking-limited' };
    return { text: 'Available', color: 'parking-available' };
  };

  const availability = getAvailabilityStatus();
  
  // Get fake rating for Airbnb style
  const getRating = () => {
    // Generate a rating between 4.0 and 5.0 based on the spot ID
    const hash = spot.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return (4 + (hash % 10) / 10).toFixed(1);
  };

  if (airbnbStyle) {
    return (
      <div 
        className={`
          bg-card text-card-foreground rounded-xl shadow-md overflow-hidden 
          transition-all duration-300 cursor-pointer
          ${isSelected ? 'ring-2 ring-primary shadow-lg' : 'hover:shadow-lg'}
          ${isBooked ? 'border-l-4 border-green-500' : ''}
        `}
        onClick={onClick}
      >
        <div className="flex flex-col md:flex-row">
          {/* Left: Image/placeholder */}
          <div className="w-full md:w-1/3 bg-muted h-48 md:h-auto relative">
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
              <span className="text-4xl font-bold">P</span>
            </div>
            {isBooked && (
              <div className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                Booked
              </div>
            )}
          </div>
          
          {/* Right: Content */}
          <div className="w-full md:w-2/3 p-4">
            <div className="flex justify-between items-start">
              <h3 className="font-medium text-lg mb-1">{spot.name}</h3>
              <span className={`text-xs font-semibold px-2 py-1 rounded-full bg-${availability.color}/10 text-${availability.color}`}>
                {availability.text}
              </span>
            </div>
            
            <p className="text-muted-foreground text-sm mb-2">{spot.address}</p>
            
            {distance !== undefined && (
              <p className="text-muted-foreground text-sm mb-3">{distance} km from your location</p>
            )}
            
            <div className="flex items-center gap-1 mb-3">
              <Star className="h-4 w-4 text-amber-500 fill-current" />
              <span className="font-medium">{getRating()}</span>
            </div>
            
            <div className="flex justify-between items-center mt-3">
              <div>
                <p className="font-bold text-lg">£{spot.pricePerHour.toFixed(2)}<span className="text-xs font-normal">/hr</span></p>
              </div>
              <button 
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isBooked 
                    ? 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900 dark:text-green-300 dark:hover:bg-green-800' 
                    : 'bg-primary text-primary-foreground hover:bg-primary/90'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  onViewDetails();
                }}
              >
                {isBooked ? 'Booked' : 'View Details'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Original card style
  return (
    <div 
      className={`
        flex-shrink-0 w-72 p-4 bg-card text-card-foreground rounded-lg shadow-md 
        transition-all duration-300 transform cursor-pointer
        ${isSelected ? 'ring-2 ring-primary scale-[1.02]' : 'hover:scale-[1.01]'}
        ${isBooked ? 'border-l-4 border-green-500' : ''}
      `}
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <h3 className="font-medium text-lg mb-1">{spot.name}</h3>
        <span className={`text-xs font-semibold px-2 py-1 rounded-full bg-${availability.color}/10 text-${availability.color}`}>
          {availability.text}
        </span>
      </div>
      
      <div className="mt-2 text-sm">
        <p className="mb-1 line-clamp-2 text-muted-foreground">{spot.address}</p>
        
        {distance !== undefined && (
          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            {distance} km away
          </p>
        )}
        
        <div className="flex justify-between items-center mt-3">
          <div>
            <p className="font-bold text-lg">£{spot.pricePerHour.toFixed(2)}<span className="text-xs font-normal">/hr</span></p>
            <p className="text-xs text-muted-foreground">{spot.availableSpaces}/{spot.totalSpaces} spaces</p>
          </div>
          <button 
            className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
              isBooked 
                ? 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900 dark:text-green-300 dark:hover:bg-green-800' 
                : 'bg-primary text-primary-foreground hover:bg-primary/90'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails();
            }}
          >
            {isBooked ? 'Booked' : 'View Details'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ParkingCard;
