
import React from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface ParkingImageProps {
  image: string;
  alt: string;
}

const ParkingImage: React.FC<ParkingImageProps> = ({ image, alt }) => {
  return (
    <AspectRatio ratio={16 / 9}>
      <img
        src={image || "/placeholder.svg"}
        alt={alt}
        className="rounded-md object-cover w-full h-full"
      />
    </AspectRatio>
  );
};

export default ParkingImage;
