
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import Logo from './ui/navbar/Logo';
import MobileMenu from './ui/navbar/MobileMenu';
import HomeButton from './ui/navbar/HomeButton';
import ThemeToggleButton from './ui/navbar/ThemeToggleButton';
import NotificationDropdown from './ui/navbar/NotificationDropdown';
import UserProfileDropdown from './ui/navbar/UserProfileDropdown';

interface SimpleNavBarProps {
  className?: string;
}

const SimpleNavBar = ({ className }: SimpleNavBarProps) => {
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
    </div>
  );
};

export default SimpleNavBar;
