
import React from 'react';
import { Button } from '@/components/ui/button';

interface ActionButtonsProps {
  onCancel: () => void;
  onBook: () => void;
  isBooking: boolean;
  isDisabled: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onCancel,
  onBook,
  isBooking,
  isDisabled
}) => {
  return (
    <div className="flex justify-end gap-3">
      <Button variant="outline" onClick={onCancel}>
        Cancel
      </Button>
      <Button 
        disabled={isBooking || isDisabled} 
        onClick={onBook}
      >
        {isBooking ? 'Booking...' : 'Book Now'}
      </Button>
    </div>
  );
};

export default ActionButtons;
