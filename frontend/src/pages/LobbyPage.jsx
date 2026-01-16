import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { ChatCard } from "../components/ChatCard";
import { useChat } from "@/context/ChatContext";

const LobbyPage = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const { rooms = [], getUnreadCount } = useChat();

  const users = rooms.map((room) => room.user);

  const currentUser = {
    id: "me",
    name: "Alex",
    avatarUrl: "https://github.com/shadcn.png",
  };

  const filteredRooms = rooms.filter((room) => {
    const name = room.user.name.toLowerCase();
    const lastMessage = room.lastMessage?.toLowerCase() || "";

    return (
      name.includes(query.toLowerCase()) ||
      lastMessage.includes(query.toLowerCase())
    );
  });

  return (
    <div className="flex flex-col gap-4 h-full relative">
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
    </div>
  );
};

export default LobbyPage;
