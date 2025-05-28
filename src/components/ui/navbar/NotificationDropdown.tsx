
import React from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { useNotifications, Notification } from '@/context/NotificationContext';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

const NotificationDropdown = () => {
  const { notifications, markAsRead, markAllAsRead } = useNotifications();
  const unreadCount = notifications.filter(notification => !notification.read).length;

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
  };

  // Notification renderer
  const renderNotification = (notification: Notification) => (
    <div 
      key={notification.id} 
      className={cn(
        "p-3 border-b border-border last:border-0 cursor-pointer transition-colors hover:bg-muted/50",
        !notification.read && "bg-muted/30"
      )}
      onClick={() => handleNotificationClick(notification)}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-1">
          {notification.icon || (
            <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
              <Bell className="h-4 w-4 text-primary" />
            </div>
          )}
        </div>
        <div className="flex-grow min-w-0">
          <h5 className={cn("text-sm font-medium", !notification.read && "font-semibold")}>
            {notification.title}
          </h5>
          <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
            {notification.description}
          </p>
          <span className="text-xs text-muted-foreground mt-1 block">
            {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
          </span>
        </div>
        {!notification.read && (
          <div className="flex-shrink-0">
            <div className="h-2 w-2 rounded-full bg-primary"></div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1.5 min-w-5 h-5 bg-destructive rounded-full text-[10px] flex items-center justify-center text-destructive-foreground px-1">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 max-h-[calc(100vh-120px)] overflow-hidden flex flex-col mt-1">
        <div className="flex items-center justify-between px-4 py-2">
          <DropdownMenuLabel className="px-0">Notifications</DropdownMenuLabel>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 text-xs"
              onClick={markAllAsRead}
            >
              Mark all as read
            </Button>
          )}
        </div>
        <DropdownMenuSeparator />
        <div className="overflow-y-auto max-h-[350px] flex-1">
          {notifications.length === 0 ? (
            <div className="p-4 text-sm text-center text-muted-foreground">
              No notifications
            </div>
          ) : (
            notifications.slice(0, 3).map(renderNotification)
          )}
          
          {notifications.length > 3 && (
            <div className="p-3 text-center">
              <Link to="/notifications" className="text-sm text-primary hover:underline">
                View all notifications ({notifications.length})
              </Link>
            </div>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationDropdown;
