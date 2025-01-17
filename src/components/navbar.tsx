"use client";

import Link from "next/link";
import { Bell, Coins, LogOut, Plus } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNotificationStore } from "@/lib/stores/notification-store";

export function Navbar() {
  const { notifications, markAsRead, clearNotification } =
    useNotificationStore();
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex justify-center">
      <div className="container flex h-14 items-center">
        <Link href="/" className="flex items-center gap-2">
          <Coins className="h-5 w-5" />
          <span className="text-xl font-light">CoinBid</span>
        </Link>

        <div className="flex flex-1 items-center justify-end gap-4">
          <Link href="/add-item">
            <Button
              variant="ghost"
              className="gap-2 rounded-full bg-black/5 px-4 hover:bg-black/10"
            >
              <Plus className="h-4 w-4" />
              <span className="font-light">Add Item</span>
            </Button>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-4 w-4" />
                {unreadCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-pink-500 text-xs font-medium text-white">
                    {unreadCount}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-[380px] rounded-lg bg-white p-0"
            >
              <DropdownMenuLabel className="p-4 font-light">
                Notifications
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="opacity-50" />
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-sm text-muted-foreground">
                  No notifications
                </div>
              ) : (
                notifications.map((notification) => (
                  <DropdownMenuItem
                    key={notification.id}
                    className="flex flex-col items-start p-4"
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex w-full justify-between">
                      <span className="font-medium">{notification.title}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 -mr-2 hover:bg-transparent"
                        onClick={(e) => {
                          e.stopPropagation();
                          clearNotification(notification.id);
                        }}
                      >
                        ×
                      </Button>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {notification.message}
                    </span>
                    <span className="mt-1 text-xs text-muted-foreground">
                      {new Date(notification.timestamp).toLocaleString()}
                    </span>
                  </DropdownMenuItem>
                ))
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8 gradient-avatar ">
                  <AvatarFallback className="font-light text-white bg-gradient-to-b from-[#848F8D] via-[#353939]  to-black">
                    AA
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 rounded-lg bg-white"
            >
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  <p className="font-medium">Animan Amit</p>
                  <p className="w-[200px] truncate text-sm text-muted-foreground">
                    747animan@gmail.com
                  </p>
                </div>
              </div>
              <DropdownMenuSeparator className="opacity-50" />
              <DropdownMenuItem className="gap-2">
                <LogOut className="h-4 w-4" />
                <span className="font-light">Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
