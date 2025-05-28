
import React from 'react';
import { toast } from "@/hooks/use-toast";
import { Check, CreditCard } from "lucide-react";
import { useNotifications } from '@/context/NotificationContext';

type BookingConfirmationProps = {
  spotName: string;
  date: string;
  time: string;
  price: string;
  paymentMethod?: string;
};

export const showBookingConfirmation = ({
  spotName,
  date,
  time,
  price,
  paymentMethod = "Default Payment Method"
}: BookingConfirmationProps) => {
  // First notification: Booking confirmation
  toast({
    title: "Booking Confirmed!",
    description: `You've successfully booked ${spotName} for ${date} at ${time}.`,
    duration: 5000,
  });
  
  // Add to global notifications
  if (typeof window !== 'undefined' && (window as any).addNotification) {
    try {
      console.log('Attempting to add booking confirmation to notifications');
      (window as any).addNotification({
        title: "Booking Confirmed!",
        description: `You've successfully booked ${spotName} for ${date} at ${time}.`,
        icon: <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="h-5 w-5 text-green-600" />
              </div>
      });
      console.log('Successfully added booking confirmation to notifications');
    } catch (error) {
      console.error('Failed to add booking confirmation notification:', error);
    }
  } else {
    console.error('NotificationBridge not mounted or addNotification not available');
  }
  
  // Second notification: Payment confirmation
  setTimeout(() => {
    toast({
      title: "Payment Processed",
      description: `${price} has been charged to your ${paymentMethod}.`,
      duration: 5000,
    });
    
    // Add payment notification to global notifications
    if (typeof window !== 'undefined' && (window as any).addNotification) {
      try {
        console.log('Attempting to add payment notification to notifications');
        (window as any).addNotification({
          title: "Payment Processed",
          description: `${price} has been charged to your ${paymentMethod}.`,
          icon: <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                </div>
        });
        console.log('Successfully added payment notification to notifications');
      } catch (error) {
        console.error('Failed to add payment notification:', error);
      }
    }
  }, 1000); // Delay by 1 second
};

// This component ensures the notification bridge is always available
export const NotificationBridge: React.FC = () => {
  const { addNotification } = useNotifications();
  
  React.useEffect(() => {
    // Make addNotification available globally
    if (typeof window !== 'undefined') {
      console.log('NotificationBridge: Setting up global addNotification function');
      
      // Store the function in window object
      (window as any).addNotification = (notification: any) => {
        console.log('Global addNotification called with:', notification);
        addNotification(notification);
      };
      
      console.log('NotificationBridge mounted, addNotification is available globally');
    }
    
    return () => {
      // Clean up
      if (typeof window !== 'undefined') {
        delete (window as any).addNotification;
        console.log('NotificationBridge unmounted, addNotification removed from global scope');
      }
    };
  }, [addNotification]);
  
  // Empty span element just to mount the component
  return <span id="notification-context-bridge" style={{ display: 'none' }} data-testid="notification-bridge" />;
};

export const BookingConfirmationNotification: React.FC<BookingConfirmationProps> = ({
  spotName,
  date,
  time,
  price,
  paymentMethod
}) => {
  return (
    <div className="flex flex-col space-y-2 w-full">
      <div className="flex items-center space-x-2">
        <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
          <Check className="h-5 w-5 text-green-600" />
        </div>
        <div>
          <h4 className="font-medium">Booking Confirmed!</h4>
          <p className="text-sm text-muted-foreground">{spotName} for {date} at {time}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2 mt-2">
        <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
          <CreditCard className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <h4 className="font-medium">Payment Processed</h4>
          <p className="text-sm text-muted-foreground">{price} via {paymentMethod}</p>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmationNotification;
