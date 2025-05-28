
import React from 'react';

interface ParkingFeaturesProps {
  features: string[];
}

const ParkingFeatures: React.FC<ParkingFeaturesProps> = ({ features = [] }) => {
  return (
    <div>
      <h3 className="font-medium mb-2">Features</h3>
      <div className="grid grid-cols-2 gap-2">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div className="h-2 w-2 rounded-full bg-primary" />
            <span>{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParkingFeatures;
