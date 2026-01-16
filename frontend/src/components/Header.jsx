import { Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function Header({ query, onSearchChange }) {
  return (
    <header className="flex items-center justify-between p-4 bg-white border-b border-slate-200 z-10">
      {/* Left side */}
      <div className="flex items-center gap-3">
        {/* Mobile: App logo */}
        <div className="md:hidden h-9 w-9 rounded-full bg-gradient-to-br from-violet-400 to-pink-400 flex items-center justify-center shadow">
          <span className="text-white font-bold">B</span>
        </div>

        {/* Desktop: Section title */}
        <h1 className="hidden md:block text-lg font-semibold text-slate-800">
          Chats
        </h1>
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-2">
        {/* New chat (desktop) */}
        <button className="hidden md:flex p-2 rounded-lg hover:bg-slate-100">
          <Plus className="w-5 h-5 text-slate-600" />
        </button>

        {/* Search */}
        <Popover>
          <PopoverTrigger asChild>
            <button className="p-2 rounded-lg hover:bg-slate-100">
              <Search className="w-5 h-5 text-slate-600" />
            </button>
          </PopoverTrigger>

          <PopoverContent align="end" className="w-64 p-2 rounded-xl">
            <Input
              autoFocus
              placeholder="Search chats…"
              value={query}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
}
