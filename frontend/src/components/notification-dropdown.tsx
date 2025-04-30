import { useState, useRef, useEffect } from "react";
import { Bell } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useNotification } from "@/contexts/notification-context";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { notifications, unreadCount, markAllAsRead, markAsRead, clearNotifications } = useNotification();
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClearAll = () => {
    clearNotifications();
    setIsOpen(false);
  };

  const handleMarkAllRead = () => {
    markAllAsRead();
  };

  const handleNotificationClick = (id: string, auctionId?: string) => {
    markAsRead(id);
    
    // Navigate to auction page if there's an auctionId
    if (auctionId) {
      navigate(`/auctions/${auctionId}`);
    }
    
    setIsOpen(false);
  };

  // Get notification icon based on type
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "bid":
        return "💰";
      case "auction-end":
        return "🏁";
      case "outbid":
        return "📉";
      case "watched":
        return "👀";
      case "success":
        return "✅";
      case "error":
        return "❌";
      case "warning":
        return "⚠️";
      default:
        return "📣";
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="relative p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
        onClick={toggleDropdown}
        aria-label="Notifications"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-20">
          <div className="py-2 px-3 bg-gray-100 flex justify-between items-center">
            <h3 className="text-sm font-medium text-gray-900">Notifications</h3>
            <div className="flex space-x-2">
              {notifications.length > 0 && (
                <>
                  <button 
                    onClick={handleMarkAllRead}
                    className="text-xs text-blue-600 hover:text-blue-800"
                  >
                    Mark all as read
                  </button>
                  <span className="text-gray-300">|</span>
                  <button 
                    onClick={handleClearAll}
                    className="text-xs text-blue-600 hover:text-blue-800"
                  >
                    Clear all
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="max-h-72 overflow-y-auto">
            {notifications.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`py-3 px-4 cursor-pointer hover:bg-gray-50 ${
                      !notification.read ? "bg-blue-50" : ""
                    }`}
                    onClick={() => handleNotificationClick(notification.id, notification.auctionId)}
                  >
                    <div className="flex items-start">
                      <div className="text-lg mr-2">{getNotificationIcon(notification.type)}</div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm ${!notification.read ? "font-medium" : "text-gray-800"}`}>
                          {notification.message}
                        </p>
                        {notification.auctionTitle && (
                          <p className="text-xs text-gray-500 mt-0.5">
                            {notification.auctionTitle}
                          </p>
                        )}
                        <p className="text-xs text-gray-500 mt-0.5">
                          {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-6 text-center text-gray-500">
                <p>No notifications yet</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};