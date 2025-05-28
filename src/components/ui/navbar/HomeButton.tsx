
import React from 'react';
import { Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const HomeButton = () => {
  const navigate = useNavigate();
  
  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className="relative"
      onClick={handleHomeClick}
      aria-label="Go to home page"
    >
      <Home className="h-5 w-5" />
    </Button>
  );
};

export default HomeButton;
