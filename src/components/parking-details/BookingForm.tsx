
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format, addHours } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { showBookingConfirmation } from '../BookingConfirmationNotification';

interface BookingFormProps {
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
  hours: number;
  setHours: React.Dispatch<React.SetStateAction<number>>;
  selectedTime?: string;
  price?: number;
  currency?: string;
  onBookingComplete?: () => void;
  spotName?: string;
}

const BookingForm: React.FC<BookingFormProps> = ({ 
  selectedDate,
  setSelectedDate,
  hours,
  setHours,
  selectedTime = "08:00",
  price, 
  currency = "$", 
  onBookingComplete,
  spotName 
}) => {
  const [startTime, setStartTime] = useState<string>(selectedTime || "08:00");
  const [isProcessing, setIsProcessing] = useState(false);

  const generateTimeOptions = () => {
    const times = [];
    for (let i = 0; i < 24; i++) {
      const hour = i.toString().padStart(2, '0');
      times.push(`${hour}:00`);
      times.push(`${hour}:30`);
    }
    return times;
  };
  
  const calculateEndTime = () => {
    if (!startTime) return '';
    
    const [hours, minutes] = startTime.split(':').map(Number);
    const startDate = new Date();
    startDate.setHours(hours, minutes, 0, 0);
    
    const endDate = addHours(startDate, hours);
    return format(endDate, 'HH:mm');
  };
  
  const handleBookNow = () => {
    if (!onBookingComplete || !price || !spotName) return;
    
    setIsProcessing(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Show the booking confirmation notification
      showBookingConfirmation({
        spotName: spotName,
        date: selectedDate ? format(selectedDate, 'MMMM d, yyyy') : 'Today',
        time: `${startTime} - ${calculateEndTime()}`,
        price: `${currency}${price * hours}`,
        paymentMethod: "Visa •••• 4242"
      });
      
      setIsProcessing(false);
      onBookingComplete();
    }, 1500);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? (
                  format(selectedDate, 'PPP')
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Start Time</label>
          <Select defaultValue={startTime} onValueChange={setStartTime}>
            <SelectTrigger>
              <SelectValue placeholder="Select time" />
            </SelectTrigger>
            <SelectContent>
              {generateTimeOptions().map((time) => (
                <SelectItem key={time} value={time}>
                  {time}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Duration (hours)</label>
        <div className="flex items-center space-x-2">
          {[1, 2, 3, 4, 8].map((hour) => (
            <Button
              key={hour}
              type="button"
              variant={hours === hour ? "default" : "outline"}
              className={cn(
                "flex-1 text-center",
                hours === hour ? "bg-primary text-primary-foreground" : ""
              )}
              onClick={() => setHours(hour)}
            >
              {hour}h
            </Button>
          ))}
        </div>
      </div>
      
      {/* Only show this part if price is available */}
      {price && (
        <div className="pt-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span>End Time:</span>
            <span className="font-medium">{calculateEndTime()}</span>
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm">Total Price:</span>
            <span className="font-bold text-lg">
              {currency}{(price * hours).toFixed(2)}
            </span>
          </div>
          
          <Button 
            className="w-full" 
            size="lg" 
            onClick={handleBookNow}
            disabled={isProcessing}
          >
            {isProcessing ? "Processing..." : "Book Now"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default BookingForm;
