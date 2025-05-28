
import React from 'react';
import { Star, Clock } from 'lucide-react';

interface ParkingInfoProps {
  rating?: number;
  reviews?: number;
}

const ParkingInfo: React.FC<ParkingInfoProps> = ({ 
  rating = 4.5, 
  reviews = 24 
}) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-1">
        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
        <span>{rating}</span>
        <span className="text-muted-foreground">({reviews} reviews)</span>
      </div>
      <div className="flex items-center gap-1 text-sm">
        <Clock className="h-4 w-4 text-muted-foreground" />
        <span>Open 24/7</span>
      </div>
    </div>
  );
};

export default ParkingInfo;
