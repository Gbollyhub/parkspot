
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNotifications } from '@/context/NotificationContext';
import { Bell } from 'lucide-react';

const TestNotificationButton = () => {
  const { addNotification } = useNotifications();
  
  const addTestNotification = () => {
    console.log('TestNotificationButton: Adding test notification');
    addNotification({
      title: "Test Notification",
      description: "This is a test notification to verify localStorage is working.",
      icon: <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Bell className="h-5 w-5 text-blue-600" />
            </div>
    });
  };
  
  return (
    <Button 
      onClick={addTestNotification}
      variant="outline"
      size="sm"
      className="fixed bottom-4 left-4 z-50"
    >
      Add Test Notification
    </Button>
  );
};

export default TestNotificationButton;
