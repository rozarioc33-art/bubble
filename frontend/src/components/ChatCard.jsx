// src/components/ChatCard.jsx
import React from "react";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";

export function ChatCard({ room, onClick, unreadCount, timestamp }) {
  return (
    <Card
      onClick={onClick}
      className="
        w-full cursor-pointer
    rounded-2xl shadow-sm
    border border-slate-200
      "
    >
      <CardContent className="flex items-center gap-4 p-4">
        {/* Avatar */}
        <Avatar className="h-12 w-12 ring-2 ring-violet-200">
          <AvatarImage src={room.user.avatarUrl} alt={room.user.name} />
          <AvatarFallback className="bg-indigo-100 text-indigo-600 font-semibold">
            {room.user.name[0]}
          </AvatarFallback>
        </Avatar>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <CardTitle className="flex items-center justify-between text-sm font-semibold text-slate-900">
            <span className="truncate">{room.user.name}</span>
            <span className="text-xs text-slate-400">
              {timestamp
                ? new Date(timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : ""}
            </span>
          </CardTitle>

          <CardDescription className="mt-1 flex items-center justify-between">
            <span className="truncate text-sm text-slate-600">
              {room.lastMessage}
            </span>

            {unreadCount > 0 && (
              <Badge className="bg-violet-100 text-violet-700 border border-violet-300 text-xs">
                {unreadCount}
              </Badge>
            )}
          </CardDescription>
        </div>
      </CardContent>
    </Card>
  );
}
