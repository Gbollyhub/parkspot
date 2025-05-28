
import React, { useState } from 'react';
import { useNotifications } from '@/context/NotificationContext';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { ChevronLeft, Check, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import SimpleNavBar from '@/components/SimpleNavBar';

const Notifications = () => {
  const { notifications, markAsRead, markAllAsRead, clearNotification } = useNotifications();
  
  const handleMarkAsRead = (id: string) => {
    markAsRead(id);
  };

  const handleClearNotification = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    clearNotification(id);
  };
  
  const hasUnreadNotifications = notifications.some(notification => !notification.read);
  
  return (
    <div className="min-h-screen bg-background">
      <SimpleNavBar />
      
      <div className="container mx-auto max-w-4xl px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Link to="/" className="mr-4">
              <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Notifications</h1>
          </div>
          
          {hasUnreadNotifications && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={markAllAsRead}
              className="text-sm"
            >
              <Check className="mr-2 h-4 w-4" />
              Mark all as read
            </Button>
          )}
        </div>
        
        {/* Notification List */}
        <div className="space-y-0.5 mb-8">
          {notifications.length === 0 ? (
            <div className="bg-background border border-border rounded-lg p-8 text-center">
              <h3 className="text-lg font-medium mb-2">No notifications yet</h3>
              <p className="text-muted-foreground">
                When you receive notifications, they will appear here.
              </p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                onClick={() => handleMarkAsRead(notification.id)}
                className={`flex items-start p-4 border-b border-border last:border-0 cursor-pointer transition-colors hover:bg-muted/20 ${
                  !notification.read ? 'bg-muted/10' : ''
                }`}
              >
                <div className="flex-shrink-0 mt-1 mr-4">
                  {notification.icon || (
                    <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-medium">N</span>
                    </div>
                  )}
                </div>
                
                <div className="flex-grow min-w-0">
                  <div className="flex justify-between items-start">
                    <h3 className={`text-base ${!notification.read ? 'font-semibold' : 'font-medium'}`}>
                      {notification.title}
                    </h3>
                    <div className="flex items-center ml-2">
                      {!notification.read && (
                        <div className="h-2 w-2 rounded-full bg-primary mr-3"></div>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                        onClick={(e) => handleClearNotification(notification.id, e)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mt-1">
                    {notification.description}
                  </p>
                  
                  <div className="text-xs text-muted-foreground mt-2">
                    {format(new Date(notification.timestamp), 'PPp')}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
