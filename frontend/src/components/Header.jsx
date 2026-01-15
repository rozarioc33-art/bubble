import React, { useState } from "react";
import { PlusIcon } from "lucide-react";
import { AvatarGroup } from "./AvatarGroup";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function Header({ users, currentUser, query, onSearchChange }) {
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow z-10">
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
          <AvatarFallback>{currentUser.name.slice(0, 1)}</AvatarFallback>
        </Avatar>
      </div>

      <div className="flex items-center gap-2">
        {/* Search */}
        <Popover>
          <PopoverTrigger asChild>
            <button className="p-2 rounded-lg hover:bg-slate-100 transition">
              <Search className="w-5 h-5 text-slate-600" />
            </button>
          </PopoverTrigger>

          <PopoverContent
            align="end"
            className="w-64 p-2 rounded-xl border-slate-200"
          >
            <Input
              autoFocus
              placeholder="Search chats…"
              value={query}
              onChange={(e) => onSearchChange(e.target.value)}
              className="rounded-lg"
            />
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
}
