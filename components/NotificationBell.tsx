"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

type Notification = {
    id: number;
    title: string;
    message: string;
    read: boolean;
    created_at: string;
};

export default function NotificationBell() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        // Mock notifications - nanti connect ke backend
        setNotifications([
            { id: 1, title: "Challenge Started", message: "Step 1 challenge has begun!", read: false, created_at: new Date().toISOString() },
            { id: 2, title: "Trade Closed", message: "Profit: +$50", read: false, created_at: new Date().toISOString() },
        ]);
        setUnreadCount(2);
    }, []);

    const markAsRead = (id: number) => {
        setNotifications(notifications.map(n =>
            n.id === id ? { ...n, read: true } : n
        ));
        setUnreadCount(notifications.filter(n => !n.read).length - 1);
    };

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
        setUnreadCount(0);
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                            {unreadCount}
                        </span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0 bg-darkcard border-gray-700">
                <div className="p-3 border-b border-gray-700 flex justify-between items-center">
                    <h3 className="font-semibold text-white">Notifications</h3>
                    {unreadCount > 0 && (
                        <button onClick={markAllAsRead} className="text-xs text-blue-500 hover:text-blue-400">
                            Mark all as read
                        </button>
                    )}
                </div>
                <div className="max-h-80 overflow-y-auto">
                    {notifications.length === 0 ? (
                        <p className="text-gray-400 text-center p-4">No notifications</p>
                    ) : (
                        notifications.map((notif) => (
                            <div
                                key={notif.id}
                                className={`p-3 border-b border-gray-700 cursor-pointer hover:bg-darknavy/50 ${!notif.read ? "bg-blue-500/10" : ""}`}
                                onClick={() => markAsRead(notif.id)}
                            >
                                <p className="text-sm font-medium text-white">{notif.title}</p>
                                <p className="text-xs text-gray-400">{notif.message}</p>
                                <p className="text-xs text-gray-500 mt-1">{new Date(notif.created_at).toLocaleTimeString()}</p>
                            </div>
                        ))
                    )}
                </div>
            </PopoverContent>
        </Popover>
    );
}