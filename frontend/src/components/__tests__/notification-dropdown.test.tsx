import { describe, it, expect, vi } from "vitest";
import { fireEvent, screen } from "@testing-library/react";
import { NotificationDropdown } from "../notification-dropdown";
import { render } from "../../test/test-utils";
import { useNotification, Notification } from "@/contexts/notification-context";

// Mock the useNotification hook
vi.mock("@/contexts/notification-context", () => ({
  useNotification: vi.fn(),
}));

// Mock the useNavigate hook
vi.mock("react-router-dom", () => ({
  ...vi.importActual("react-router-dom"),
  useNavigate: () => vi.fn(),
}));

describe("NotificationDropdown", () => {
  it("renders correctly with unread notifications", () => {
    // Setup mock
    const mockMarkAllAsRead = vi.fn();
    const mockMarkAsRead = vi.fn();
    const mockClearNotifications = vi.fn();

    // Setup mock notifications
    const mockNotifications: Notification[] = [
      {
        id: "1",
        message: "Test notification",
        timestamp: new Date().toISOString(),
        type: "info",
        read: false,
      },
      {
        id: "2",
        message: "Another notification",
        timestamp: new Date().toISOString(),
        type: "success",
        read: true,
        auctionId: "auction123",
        auctionTitle: "Test Auction",
      },
    ];

    (useNotification as ReturnType<typeof vi.fn>).mockReturnValue({
      notifications: mockNotifications,
      unreadCount: 1,
      markAllAsRead: mockMarkAllAsRead,
      markAsRead: mockMarkAsRead,
      clearNotifications: mockClearNotifications,
      notify: vi.fn(),
      addNotification: vi.fn(),
    });

    render(<NotificationDropdown />);

    // Check if the bell icon is displayed
    expect(screen.getByLabelText(/notifications/i)).toBeInTheDocument();

    // Check if the unread badge is displayed
    const badge = screen.getByText("1");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("bg-red-500");
  });

  it("shows notification list when clicked", () => {
    // Setup mock
    const mockNotifications: Notification[] = [
      {
        id: "1",
        message: "Test notification",
        timestamp: new Date().toISOString(),
        type: "info",
        read: false,
      },
    ];

    (useNotification as ReturnType<typeof vi.fn>).mockReturnValue({
      notifications: mockNotifications,
      unreadCount: 1,
      markAllAsRead: vi.fn(),
      markAsRead: vi.fn(),
      clearNotifications: vi.fn(),
      notify: vi.fn(),
      addNotification: vi.fn(),
    });

    render(<NotificationDropdown />);

    // Initially dropdown should be closed
    expect(screen.queryByText("Notifications")).not.toBeInTheDocument();

    // Click the bell icon
    fireEvent.click(screen.getByLabelText(/notifications/i));

    // Check if dropdown is opened
    expect(screen.getByText("Notifications")).toBeInTheDocument();
    expect(screen.getByText("Test notification")).toBeInTheDocument();
    expect(screen.getByText("Mark all as read")).toBeInTheDocument();
  });

  it("shows empty state when no notifications", () => {
    // Setup mock with empty notifications
    (useNotification as ReturnType<typeof vi.fn>).mockReturnValue({
      notifications: [],
      unreadCount: 0,
      markAllAsRead: vi.fn(),
      markAsRead: vi.fn(),
      clearNotifications: vi.fn(),
      notify: vi.fn(),
      addNotification: vi.fn(),
    });

    render(<NotificationDropdown />);

    // Click the bell icon
    fireEvent.click(screen.getByLabelText(/notifications/i));

    // Check if empty state is shown
    expect(screen.getByText("No notifications yet")).toBeInTheDocument();
  });

  it('calls markAllAsRead when clicking "Mark all as read"', () => {
    // Setup mock
    const mockMarkAllAsRead = vi.fn();

    (useNotification as ReturnType<typeof vi.fn>).mockReturnValue({
      notifications: [
        {
          id: "1",
          message: "Test notification",
          timestamp: new Date().toISOString(),
          type: "info",
          read: false,
        },
      ],
      unreadCount: 1,
      markAllAsRead: mockMarkAllAsRead,
      markAsRead: vi.fn(),
      clearNotifications: vi.fn(),
      notify: vi.fn(),
      addNotification: vi.fn(),
    });

    render(<NotificationDropdown />);

    // Click the bell icon to open dropdown
    fireEvent.click(screen.getByLabelText(/notifications/i));

    // Click "Mark all as read"
    fireEvent.click(screen.getByText("Mark all as read"));

    // Check if markAllAsRead was called
    expect(mockMarkAllAsRead).toHaveBeenCalled();
  });
});
