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
    rounded-2xl
    border border-slate-200
    shadow-sm
    transition-all duration-200
    hover:shadow-md hover:border-violet-200
    hover:bg-violet-50/40
  "
    >
      <CardContent className="flex items-center gap-4 p-4">
        {/* Avatar */}
        {/* Avatar */}
        <Avatar className="h-12 w-12 p-[2px] rounded-full bg-gradient-to-br from-violet-400 to-pink-400">
          <div className="h-full w-full rounded-full bg-white flex items-center justify-center">
            <AvatarImage
              src={room.user.avatarUrl}
              alt={room.user.name}
              className="rounded-full object-cover"
            />
            <AvatarFallback className="bg-slate-100 text-slate-700 font-semibold">
              {room.user.name[0]}
            </AvatarFallback>
          </div>
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
              <Badge
                className="
    bg-violet-100 text-violet-700
    border border-violet-300
    text-xs shadow-sm
    transition-all duration-200
    hover:bg-violet-200 hover:border-violet-400
    group-hover:bg-violet-200
    group-hover:border-violet-400
  "
              >
                {unreadCount}
              </Badge>
            )}
          </CardDescription>
        </div>
      </CardContent>
    </Card>
  );
}
