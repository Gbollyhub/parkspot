
import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from "@/hooks/use-toast";
import { parkingSpots } from '@/mock/parkingData';

interface Booking {
  spotId: string;
  date: Date;
  hours: number;
  timestamp: Date;
  spotName?: string;
  spotLocation?: string;
}

interface SpotInventory {
  [spotId: string]: number;
}

interface BookingContextType {
  bookings: Booking[];
  addBooking: (spotId: string, date: Date, hours: number) => void;
  isSpotBooked: (spotId: string) => boolean;
  clearBookings: () => void;
  removeBooking: (index: number) => void;
  getSpotAvailability: (spotId: string) => number;
}

// Local storage keys
const STORAGE_KEY = 'parking-bookings';
const INVENTORY_KEY = 'parking-inventory';

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      // Load bookings from localStorage on initialization
      const savedBookings = localStorage.getItem(STORAGE_KEY);
      
      if (savedBookings) {
        // Parse the stored JSON and convert string dates back to Date objects
        return JSON.parse(savedBookings, (key, value) => {
          if (key === 'date' || key === 'timestamp') {
            return new Date(value);
          }
          return value;
        });
      }
    } catch (error) {
      console.error('Error parsing saved bookings:', error);
    }
    return [];
  });

  // Initialize inventory with default values from parkingData
  function initializeInventory(): SpotInventory {
    const inventory: SpotInventory = {};
    parkingSpots.forEach(spot => {
      // Use the actual availableSpaces from the parking spot data
      inventory[spot.id] = spot.availableSpaces;
    });
    console.log('Initialized inventory:', inventory);
    return inventory;
  }

  const [spotInventory, setSpotInventory] = useState<SpotInventory>(() => {
    try {
      // Load inventory from localStorage or initialize with default values
      const savedInventory = localStorage.getItem(INVENTORY_KEY);
      if (savedInventory) {
        const parsed = JSON.parse(savedInventory);
        console.log('Loaded inventory from localStorage:', parsed);
        return parsed;
      }
    } catch (error) {
      console.error('Error parsing saved inventory:', error);
    }
    const newInventory = initializeInventory();
    console.log('Using new inventory:', newInventory);
    return newInventory;
  });

  // Save bookings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  }, [bookings]);

  // Save inventory to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(INVENTORY_KEY, JSON.stringify(spotInventory));
    console.log('Saved inventory to localStorage:', spotInventory);
  }, [spotInventory]);

  const addBooking = (spotId: string, date: Date, hours: number) => {
    // Find spot details for better notifications
    const spot = parkingSpots.find(s => s.id === spotId);
    
    const newBooking = {
      spotId,
      date,
      hours,
      timestamp: new Date(),
      spotName: spot?.name,
      spotLocation: spot?.address
    };
    
    console.log('Adding new booking:', newBooking);
    setBookings(prev => [...prev, newBooking]);
    
    // Reduce the available spots for this location
    setSpotInventory(prev => {
      const currentAvailable = prev[spotId] || 0;
      const newAvailable = Math.max(0, currentAvailable - 1);
      console.log(`Reducing inventory for ${spotId}: ${currentAvailable} -> ${newAvailable}`);
      return {
        ...prev,
        [spotId]: newAvailable
      };
    });
    
    // Toast notification is handled in components for better UI control
  };

  const isSpotBooked = (spotId: string) => {
    return bookings.some(booking => booking.spotId === spotId);
  };

  const getSpotAvailability = (spotId: string) => {
    const available = spotInventory[spotId];
    console.log(`Getting availability for ${spotId}: ${available}`);
    
    // If we don't have this spot in inventory, get it from the original data
    if (available === undefined) {
      const spot = parkingSpots.find(s => s.id === spotId);
      const originalAvailable = spot?.availableSpaces || 0;
      console.log(`Spot ${spotId} not in inventory, using original: ${originalAvailable}`);
      
      // Update inventory with the original value
      setSpotInventory(prev => ({
        ...prev,
        [spotId]: originalAvailable
      }));
      
      return originalAvailable;
    }
    
    return available;
  };

  const clearBookings = () => {
    setBookings([]);
    // Reset inventory to initial state
    setSpotInventory(initializeInventory());
  };

  const removeBooking = (index: number) => {
    if (index >= 0 && index < bookings.length) {
      const booking = bookings[index];
      
      // Increase the inventory count when a booking is removed
      if (booking) {
        setSpotInventory(prev => ({
          ...prev,
          [booking.spotId]: (prev[booking.spotId] || 0) + 1
        }));
      }
      
      setBookings(prev => prev.filter((_, i) => i !== index));
      
      toast({
        title: "Booking Removed",
        description: "Your booking has been successfully removed.",
      });
    }
  };

  return (
    <BookingContext.Provider value={{ 
      bookings, 
      addBooking, 
      isSpotBooked, 
      clearBookings, 
      removeBooking,
      getSpotAvailability
    }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
