import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ParkingSpot } from '@/mock/parkingData';
import { MapPin, Check, CreditCard } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from '@/hooks/use-toast';
import { useBooking } from '@/context/BookingContext';
import { useNotifications } from '@/context/NotificationContext';
import { Coordinates } from '@/utils/locationUtils';

// Importing the refactored components
import ParkingImage from './parking-details/ParkingImage';
import ParkingInfo from './parking-details/ParkingInfo';
import BookingForm from './parking-details/BookingForm';
import ParkingFeatures from './parking-details/ParkingFeatures';
import PricingSummary from './parking-details/PricingSummary';
import ActionButtons from './parking-details/ActionButtons';

interface ParkingDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  parkingSpot: ParkingSpot | null;
  selectedDate?: Date;
  selectedTime?: string;
  isBooked?: boolean;
  userLocation?: Coordinates | null;
}

const ParkingDetailsModal: React.FC<ParkingDetailsModalProps> = ({
  isOpen,
  onClose,
  parkingSpot,
  selectedDate: initialSelectedDate,
  selectedTime,
  isBooked,
  userLocation
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(initialSelectedDate || new Date());
  const [hours, setHours] = useState<number>(1);
  const [isBooking, setIsBooking] = useState(false);
  const { addBooking, getSpotAvailability } = useBooking();
  const { addNotification } = useNotifications();
  
  if (!parkingSpot) return null;

  const availableSpaces = getSpotAvailability(parkingSpot.id);
  
  const handleBooking = async () => {
    if (availableSpaces <= 0) {
      toast({
        title: "No spots available",
        description: "Sorry, this parking location is fully booked.",
        variant: "destructive"
      });
      return;
    }
    
    setIsBooking(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 700));
      
      // Add booking to context which handles availability reduction
      addBooking(parkingSpot.id, selectedDate, hours);
      
      const formattedDate = format(selectedDate, 'MMM d, yyyy');
      const totalPrice = `$${(parkingSpot.pricePerHour * hours).toFixed(2)}`;
      
      // Add booking confirmation notification
      console.log('Adding booking confirmation notification');
      addNotification({
        title: "Booking Confirmed!",
        description: `You've successfully booked ${parkingSpot.name} for ${formattedDate} at ${selectedTime || 'selected time'}.`,
        icon: <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="h-5 w-5 text-green-600" />
              </div>
      });
      
      // Add payment notification after a short delay
      setTimeout(() => {
        console.log('Adding payment notification');
        addNotification({
          title: "Payment Processed",
          description: `${totalPrice} has been charged to your Default Payment Method.`,
          icon: <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                </div>
        });
      }, 1000);
      
      // Show detailed success toast
      toast({
        title: "Booking Confirmed!",
        description: `${parkingSpot.name} booked for ${hours} hour${hours > 1 ? 's' : ''} on ${formattedDate} at ${selectedTime || 'selected time'}. ${availableSpaces - 1} spot${availableSpaces - 1 !== 1 ? 's' : ''} remaining.`,
      });
      
      // Close modal
      onClose();
      
    } catch (error) {
      console.error('Booking error:', error);
      toast({
        title: "Booking Failed",
        description: "There was an error processing your booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsBooking(false);
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">{parkingSpot.name}</DialogTitle>
          <DialogDescription className="flex items-center gap-1 text-sm">
            <MapPin className="h-4 w-4" /> {parkingSpot.address}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <ParkingImage 
            image={parkingSpot.image || "/placeholder.svg"} 
            alt={parkingSpot.name} 
          />
          
          <ParkingInfo 
            rating={parkingSpot.rating} 
            reviews={parkingSpot.reviews} 
          />
          
          <BookingForm
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            hours={hours}
            setHours={setHours}
            selectedTime={selectedTime}
          />
          
          <div className="pt-4 border-t border-border">
            <div className="space-y-4">
              <ParkingFeatures 
                features={parkingSpot.features || parkingSpot.facilities || []} 
              />
              
              <PricingSummary
                pricePerHour={parkingSpot.pricePerHour}
                hours={hours}
                availableSpaces={availableSpaces}
              />
            </div>
          </div>
        </div>
        
        <ActionButtons
          onCancel={onClose}
          onBook={handleBooking}
          isBooking={isBooking}
          isDisabled={availableSpaces <= 0}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ParkingDetailsModal;
