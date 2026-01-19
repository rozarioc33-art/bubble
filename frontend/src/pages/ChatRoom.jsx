import { useChat } from "@/context/ChatContext";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { PaperAirplaneIcon, CheckIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const ChatRoom = () => {
  const { id: roomId } = useParams();
  console.log("id:", roomId);
  const [text, setText] = useState("");
  const { messagesByRoom, sendMessage, markRoomAsRead, rooms, typingByRoom } =
    useChat();
  const bottomRef = useRef(null);

  const messages = messagesByRoom[roomId] || [];
  const room = rooms.find((r) => r.id === roomId);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (roomId) {
      markRoomAsRead(roomId);
    }
  }, [roomId]);

  const handleSend = () => {
    if (!text.trim()) return;
    sendMessage(roomId, text);
    setText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-full w-full flex flex-col bg-slate-50 min-h-0">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 bg-white/80 backdrop-blur-sm flex items-center gap-3">
        <Avatar className="h-9 w-9 ring-2 ring-violet-200">
          <AvatarImage src={room.user.avatarUrl} />
          <AvatarFallback>{room.user.name.charAt(0)}</AvatarFallback>
        </Avatar>

        <div className="flex flex-col leading-tight">
          <span className="font-semibold text-slate-900">{room.user.name}</span>

          <span className="text-xs text-violet-700 bg-violet-100 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
            Explorer 🧭
          </span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 min-h-0 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((m) => {
          const isMe = m.sender === "me";
          const avatarLetter = m.senderName?.charAt(0).toUpperCase() || "U";

          return (
            <div
              key={m.id}
              className={`flex ${isMe ? "justify-end" : "justify-start"}`}
            >
              {/* Avatar */}
              {!isMe && (
                <div className="mr-3 flex-shrink-0">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={room.user.avatarUrl} />
                    <AvatarFallback>{room.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>
              )}

              {/* Message */}
              <div
                className={`flex flex-col max-w-xs md:max-w-md ${
                  isMe ? "items-end" : "items-start"
                }`}
              >
                {!isMe && (
                  <span className="text-xs font-medium text-slate-600 mb-1 ml-1">
                    {m.senderName || "Someone"}
                  </span>
                )}

                <div
                  className={`px-4 py-3 rounded-3xl shadow-sm shadow-violet-200/30
    ${
      isMe
        ? "bg-gradient-to-br from-violet-400 to-pink-400 text-white rounded-br-md"
        : "bg-violet-50 text-violet-900 rounded-bl-md border border-violet-100"
    }`}
                >
                  <p className="text-sm leading-relaxed">{m.text}</p>
                </div>

                {/* Meta */}
                <div
                  className={`flex items-center mt-1 text-xs text-slate-400 ${
                    isMe ? "justify-end" : "justify-start"
                  }`}
                >
                  <span className={isMe ? "mr-1" : "ml-1"}>
                    {new Date(m.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>

                  {isMe && (
                    <span className="ml-1 flex items-center">
                      {m.status === "sent" && <CheckIcon className="w-3 h-3" />}
                      {m.status === "delivered" && (
                        <CheckIcon className="w-3 h-3" />
                      )}
                      {m.status === "read" && (
                        <CheckCircleIcon className="w-3 h-3 text-slate-300" />
                      )}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        <div ref={bottomRef} />
      </div>

      {typingByRoom[roomId] && (
        <div className="px-4 py-2 text-sm text-slate-500 italic">
          Alex is typing…
        </div>
      )}

      {/* Input */}
      {/* Input */}
      <div className="p-3 border-t border-slate-200 bg-white flex gap-2 items-center">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-slate-100 border-none rounded-full px-4 py-2 shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-300"
          placeholder="Type a message… 💬"
        />

        <button
          onClick={handleSend}
          className="bg-gradient-to-br from-violet-400 to-pink-400
hover:bg-violet-600 p-3 rounded-full text-white flex items-center justify-center transition-transform hover:scale-105 shadow-md"
        >
          <PaperAirplaneIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
