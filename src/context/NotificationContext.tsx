import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Notification {
  id: string;
  title: string;
  description: string;
  timestamp: Date;
  read: boolean;
  icon?: React.ReactNode;
}

interface SerializableNotification {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotification: (id: string) => void;
  clearAllNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  
  // Load notifications from localStorage on mount
  useEffect(() => {
    console.log('NotificationProvider: Loading notifications from localStorage');
    try {
      const savedNotifications = localStorage.getItem('parkspot_notifications');
      console.log('NotificationProvider: Raw localStorage data:', savedNotifications);
      if (savedNotifications) {
        const parsedNotifications: SerializableNotification[] = JSON.parse(savedNotifications);
        console.log('NotificationProvider: Parsed notifications:', parsedNotifications);
        // Convert string timestamps back to Date objects and add empty icon
        const processedNotifications: Notification[] = parsedNotifications.map((notification) => ({
          ...notification,
          timestamp: new Date(notification.timestamp),
          icon: undefined // Icons will be handled by the rendering components
        }));
        setNotifications(processedNotifications);
        console.log('NotificationProvider: Successfully loaded notifications', processedNotifications);
      } else {
        console.log('NotificationProvider: No notifications found in localStorage');
      }
    } catch (e) {
      console.error('Failed to parse notifications from localStorage', e);
      // Clear corrupted data
      localStorage.removeItem('parkspot_notifications');
    }
  }, []);
  
  // Save notifications to localStorage whenever they change
  useEffect(() => {
    console.log('NotificationProvider: useEffect triggered for saving, notifications:', notifications);
    try {
      if (notifications.length > 0) {
        // Create a serializable copy of the notifications (without icons)
        const serializableNotifications: SerializableNotification[] = notifications.map(notification => ({
          id: notification.id,
          title: notification.title,
          description: notification.description,
          timestamp: notification.timestamp.toISOString(),
          read: notification.read
        }));
        
        console.log('NotificationProvider: Saving notifications to localStorage', serializableNotifications);
        localStorage.setItem('parkspot_notifications', JSON.stringify(serializableNotifications));
        console.log('NotificationProvider: Successfully saved to localStorage');
        
        // Verify it was saved
        const verification = localStorage.getItem('parkspot_notifications');
        console.log('NotificationProvider: Verification read from localStorage:', verification);
      } else {
        console.log('NotificationProvider: No notifications to save, clearing localStorage');
        localStorage.removeItem('parkspot_notifications');
      }
    } catch (error) {
      console.error('Error saving notifications to localStorage:', error);
    }
  }, [notifications]);
  
  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      read: false
    };
    
    console.log('NotificationProvider: Adding new notification', newNotification);
    console.log('NotificationProvider: Current notifications before adding:', notifications);
    setNotifications(prev => {
      const updated = [newNotification, ...prev];
      console.log('NotificationProvider: Updated notifications array:', updated);
      return updated;
    });
  };
  
  const markAsRead = (id: string) => {
    console.log('NotificationProvider: Marking notification as read', id);
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };
  
  const markAllAsRead = () => {
    console.log('NotificationProvider: Marking all notifications as read');
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };
  
  const clearNotification = (id: string) => {
    console.log('NotificationProvider: Clearing notification', id);
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };
  
  const clearAllNotifications = () => {
    console.log('NotificationProvider: Clearing all notifications');
    setNotifications([]);
  };
  
  return (
    <NotificationContext.Provider 
      value={{ 
        notifications, 
        addNotification, 
        markAsRead, 
        markAllAsRead,
        clearNotification,
        clearAllNotifications
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
