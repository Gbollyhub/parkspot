import React from 'react';
import NavBar from '@/components/ui/navbar';

interface NavBarWithThemeProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
  selectedTime: string;
  setSelectedTime: (time: string) => void;
  activeFilters: string[];
  setActiveFilters: (filters: string[]) => void;
}

const NavBarWithTheme = (props: NavBarWithThemeProps & { onPlaceSearch?: (query: string) => void }) => {
  return (
    <div className="relative">
      <NavBar {...props} />
    </div>
  );
};

export default NavBarWithTheme;
