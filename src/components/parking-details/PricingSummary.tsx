
import React from 'react';

interface PricingSummaryProps {
  pricePerHour: number;
  hours: number;
  availableSpaces: number;
}

const PricingSummary: React.FC<PricingSummaryProps> = ({ 
  pricePerHour, 
  hours, 
  availableSpaces 
}) => {
  const totalPrice = pricePerHour * hours;
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <div className="flex items-center justify-between font-semibold">
      <div>
        <span className="text-xl">{formatPrice(pricePerHour)}</span>
        <span className="text-muted-foreground text-sm"> / hour</span>
      </div>
      <div className="text-right">
        <div>Total: {formatPrice(totalPrice)}</div>
        <div className="text-sm text-muted-foreground">
          {availableSpaces} spot{availableSpaces !== 1 ? 's' : ''} available
        </div>
      </div>
    </div>
  );
};

export default PricingSummary;
