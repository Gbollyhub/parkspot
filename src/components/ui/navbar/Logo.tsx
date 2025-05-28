
import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
        <span className="text-primary-foreground font-bold text-lg">P</span>
      </div>
      <span className="text-xl font-semibold text-foreground">ParkSpot</span>
    </Link>
  );
};

export default Logo;
