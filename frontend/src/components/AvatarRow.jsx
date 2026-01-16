// src/components/AvatarRow.jsx
import React from "react";
import { PlusIcon } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function AvatarRow({
  users = [],
  max = 6,
  onAvatarClick,
  onAddClick,
}) {
  const visible = users.slice(0, max);
  const overflow = users.length - visible.length;

  return (
    <div className="px-4 py-2 bg-white border-b">
      <div className="flex items-center justify-between">
        {/* avatars container: horizontally scrollable on small screens */}
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-1">
          {visible.map((u) => (
            <button
              key={u.id}
              onClick={() => onAvatarClick?.(u)}
              title={u.name}
              aria-label={`Open chat with ${u.name}`}
              className="flex-shrink-0 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-300"
            >
              <Avatar className="h-10 w-10 ring-1 ring-slate-100">
                <AvatarImage src={u.avatarUrl} alt={u.name} />
                <AvatarFallback>{u.name?.[0]}</AvatarFallback>
              </Avatar>
            </button>
          ))}

          {overflow > 0 && (
            <div
              className="ml-1 h-10 min-w-[40px] px-2 rounded-full bg-slate-100 text-sm text-slate-600 flex items-center justify-center"
              title={`${overflow} more`}
              aria-hidden
            >
              +{overflow}
            </div>
          )}
        </div>

        {/* add button */}
        <button
          onClick={onAddClick}
          aria-label="New chat"
          title="New chat"
          className="ml-3 p-1.5 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        >
          <PlusIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
