import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

type NotificationType = "success" | "error" | "info" | "warning" | "bid" | "auction-end" | "outbid" | "watched";

export interface Notification {
  id: string;
  message: string;
  timestamp: string;
  type: NotificationType;
  auctionId?: string;
  auctionTitle?: string;
  read: boolean;
}

interface NotificationContextType {
  notify: (message: string, type?: NotificationType) => void;
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAllAsRead: () => void;
  markAsRead: (id: string) => void;
  clearNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType>({
  notify: () => {},
  notifications: [],
  unreadCount: 0,
  addNotification: () => {},
  markAllAsRead: () => {},
  markAsRead: () => {},
  clearNotifications: () => {},
});

export function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Calculate unread count when notifications change
  useEffect(() => {
    const count = notifications.filter(notification => !notification.read).length;
    setUnreadCount(count);
  }, [notifications]);

  // Save notifications to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('auction-notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Load notifications from localStorage on initial mount
  useEffect(() => {
    const saved = localStorage.getItem('auction-notifications');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setNotifications(parsed);
      } catch (e) {
        console.error('Failed to parse saved notifications:', e);
      }
    }
  }, []);

  const notify = (message: string, type: NotificationType = "info", toastId?: string) => {
    // Toast options for shorter duration (3 seconds)
    const toastOptions = { 
      duration: 3000,
      id: toastId || `toast-${type}-${Date.now()}`  // Use provided ID or generate one
    };
    
    switch (type) {
      case "success":
        toast.success(message, toastOptions);
        break;
      case "error":
        toast.error(message, toastOptions);
        break;
      case "warning":
        toast.warning(message, toastOptions);
        break;
      // Don't show toasts for bid/auction notifications - they're too frequent
      case "bid":
      case "watched":
      case "auction-end":
      case "outbid":
        // No toast for these types, just the persistent notification
        break;
      default:
        toast(message, toastOptions);
    }
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    // Create a new notification with generated id and timestamp
    const newNotification: Notification = {
      ...notification,
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      read: false,
    };

    // Generate a unique toast ID to prevent duplicates
    const toastId = `toast-${notification.type}-${notification.message.substring(0, 20)}-${Date.now()}`;
    
    // The notify function will determine whether to show a toast based on the notification type
    notify(notification.message, notification.type, toastId);

    // Add to notification list (keeping only 20 most recent)
    setNotifications(prev => [newNotification, ...prev.slice(0, 19)]);
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider value={{ 
      notify, 
      notifications, 
      unreadCount,
      addNotification,
      markAllAsRead,
      markAsRead,
      clearNotifications
    }}>
      {children}
    </NotificationContext.Provider>
  );
}

export interface NotificationButtonProps {
  message: string;
  type?: NotificationType;
}

export const useNotification = () => useContext(NotificationContext);
