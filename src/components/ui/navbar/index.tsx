
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import Logo from './Logo';
import MobileMenu from './MobileMenu';
import HomeButton from './HomeButton';
import ThemeToggleButton from './ThemeToggleButton';
import NotificationDropdown from './NotificationDropdown';
import UserProfileDropdown from './UserProfileDropdown';
import SearchBar from './SearchBar';
import FilterChips from './FilterChips';

interface NavBarProps {
  className?: string;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
  selectedTime: string;
  setSelectedTime: (time: string) => void;
  activeFilters: string[];
  setActiveFilters: (filters: string[]) => void;
}

const NavBar = ({ 
  className,
  searchQuery,
  setSearchQuery,
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  activeFilters,
  setActiveFilters,
  onPlaceSearch
}: NavBarProps & { onPlaceSearch?: (query: string) => void }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className={cn("w-full", className)}>
      {/* Main Navigation Bar */}
      <header className="bg-background border-b border-border px-4 md:px-6 py-3 shadow-sm sticky top-0 z-50">
        <div className="mx-auto flex items-center justify-between">
          {/* Logo */}
          <Logo />
          
          {/* Center area - reserved for future nav items */}
          <div className="hidden md:flex"></div>
          
          {/* Right-side items */}
          <div className="flex items-center space-x-4">
            {/* Mobile menu button */}
            <MobileMenu open={mobileMenuOpen} setOpen={setMobileMenuOpen} />
            
            {/* Home Button */}
            <HomeButton />
            
            {/* Theme Toggle Button */}
            <ThemeToggleButton />
            
            {/* Notifications - visible on all devices */}
            <NotificationDropdown />
            
            {/* User Profile - visible on larger screens */}
            <UserProfileDropdown />
          </div>
        </div>
      </header>
      
      {/* Search and Filter Bar */}
      <div className="bg-background shadow-sm px-4 md:px-6 py-3 border-b border-border overflow-x-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Search Bar alongside Date and Time pickers */}
          <SearchBar 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
            onPlaceSearch={onPlaceSearch}
          />
        </div>
        
        {/* Filter Pills - horizontally scrollable on mobile */}
        <FilterChips 
          activeFilters={activeFilters}
          setActiveFilters={setActiveFilters}
        />
      </div>
    </div>
  );
};

export default NavBar;
