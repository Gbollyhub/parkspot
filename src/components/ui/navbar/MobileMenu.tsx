
import React from 'react';
import { Menu, X, User, Calendar, Bell, Settings, PlusSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useNotifications } from '@/context/NotificationContext';

interface MobileMenuProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ open, setOpen }) => {
  const { notifications } = useNotifications();
  const unreadCount = notifications.filter(notification => !notification.read).length;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[80%] sm:max-w-sm">
        <div className="flex flex-col h-full pt-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">P</span>
              </div>
              <span className="text-xl font-semibold">ParkSpot</span>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="space-y-6 flex-1">
            <Link to="/profile">
              <Button variant="ghost" className="w-full justify-start text-base">
                <User className="mr-2 h-4 w-4" /> Profile
              </Button>
            </Link>
            <Link to="/bookings">
              <Button variant="ghost" className="w-full justify-start text-base">
                <Calendar className="mr-2 h-4 w-4" /> Bookings
              </Button>
            </Link>
            <Link to="/notifications">
              <Button variant="ghost" className="w-full justify-start text-base">
                <Bell className="mr-2 h-4 w-4" /> 
                Notifications
                {unreadCount > 0 && (
                  <span className="ml-2 text-xs bg-primary text-primary-foreground px-1.5 py-0.5 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </Button>
            </Link>
            <Link to="/settings">
              <Button variant="ghost" className="w-full justify-start text-base">
                <Settings className="mr-2 h-4 w-4" /> Settings
              </Button>
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
