import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import Header from "../components/Header";
import { ChatCard } from "../components/ChatCard";
import { useChat } from "@/context/ChatContext";
import { useUser } from "@/context/UserContext";

const LobbyPage = ({ onOpenProfile }) => {
  const isDesktop = useMediaQuery({ minWidth: 768 });
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const { rooms = [], getUnreadCount } = useChat();

  const users = rooms.map((room) => room.user);

  const { currentUser } = useUser();

  const filteredRooms = rooms.filter((room) => {
    const name = room.user.name.toLowerCase();
    const lastMessage = room.lastMessage?.toLowerCase() || "";

    return (
      name.includes(query.toLowerCase()) ||
      lastMessage.includes(query.toLowerCase())
    );
  });

  return (
    <div className="flex h-full">
      {/* Sidebar for desktop */}
      {/* Sidebar for desktop */}
      <div className="hidden md:flex flex-col w-20 border-r border-slate-200 items-center py-4 gap-6">
        {/* App logo */}
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-violet-400 to-pink-400 flex items-center justify-center shadow-md">
          <span className="text-white font-extrabold text-lg">B</span>
        </div>

        {/* Nav */}
        <button
          className="p-2 rounded-lg hover:bg-slate-100"
          onClick={() => navigate("/")}
        >
          🏠
        </button>

        <button
          className="p-2 rounded-lg hover:bg-slate-100"
          onClick={() => {
            if (isDesktop) {
              onOpenProfile();
            } else {
              navigate("/profile");
            }
          }}
        >
          👤
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col gap-4 h-full relative">
        {/* Header */}
        <Header
          users={users}
          currentUser={currentUser}
          query={query}
          onSearchChange={setQuery}
        />

        {/* Scrollable Room List */}
        <div className="flex-1 overflow-auto px-4 bg-white border-r border-slate-200">
          {filteredRooms.map((room) => {
            const unreadCount = getUnreadCount(room.id);

            return (
              <ChatCard
                key={room.id}
                room={room}
                unreadCount={unreadCount}
                timestamp={room.lastMessageAt}
                onClick={() => navigate(`/chat/${room.id}`)}
              />
            );
          })}

          {filteredRooms.length === 0 && (
            <p className="text-sm text-slate-500 text-center mt-6">
              No chats found
            </p>
          )}
        </div>

        {/* Bottom nav for mobile */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around p-2 md:hidden">
          <button
            className="flex-1 p-2 text-center hover:bg-slate-100 rounded-lg"
            onClick={() => navigate("/")}
          >
            🏠
          </button>
          <button
            className="flex-1 p-2 text-center hover:bg-slate-100 rounded-lg"
            onClick={() => navigate("/new-chat")}
          >
            ➕
          </button>
          <button
            className="flex-1 p-2 text-center hover:bg-slate-100 rounded-lg"
            onClick={() => {
              if (isDesktop) {
                onOpenProfile();
              } else {
                navigate("/profile");
              }
            }}
          >
            👤
          </button>
        </div>
      </div>
    </div>
  );
};

export default LobbyPage;
