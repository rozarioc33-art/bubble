import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./UserContext";

const ChatContext = createContext();

const DEFAULT_ROOMS = [
  {
    id: "1",
    type: "dm",
    user: {
      id: "u1",
      name: "Alex",
      avatarUrl: "https://github.com/shadcn.png",
      isOnline: true,
    },
    lastMessage: "",
    lastMessageAt: null,
  },
  {
    id: "2",
    type: "dm",
    user: {
      id: "u2",
      name: "Chris",
      avatarUrl: "https://images.unsplash.com/photo-1728577740843-5f29c7586afe",
      isOnline: false,
    },
    lastMessage: "",
    lastMessageAt: null,
  },
  {
    id: "3",
    type: "dm",
    user: {
      id: "u3",
      name: "Taylor",
      avatarUrl: "https://images.unsplash.com/photo-1699524826369-57870e627c43",
      isOnline: false,
    },
    lastMessage: "",
    lastMessageAt: null,
  },
  {
    id: "4",
    type: "dm",
    user: {
      id: "u4",
      name: "Casey",
      avatarUrl:
        "https://plus.unsplash.com/premium_photo-1739283664366-abb2b1c6f218",
      isOnline: true,
    },
    lastMessage: "",
    lastMessageAt: null,
  },
  {
    id: "5",
    type: "dm",
    user: {
      id: "u5",
      name: "Jamie",
      avatarUrl: "https://images.unsplash.com/photo-1655650876167-ebaf308495a5",
      isOnline: false,
    },
    lastMessage: "",
    lastMessageAt: null,
  },
];

export const ChatProvider = ({ children }) => {
  const { currentUser } = useUser();
  const [typingByRoom, setTypingByRoom] = useState({});
  const [rooms, setRooms] = useState(() => {
    try {
      const saved = localStorage.getItem("rooms");

      if (!saved) {
        return DEFAULT_ROOMS;
      }

      const parsed = JSON.parse(saved);

      if (!Array.isArray(parsed)) {
        return DEFAULT_ROOMS;
      }

      return parsed.map((room, i) => ({
        ...DEFAULT_ROOMS[i],
        ...room,
        user: {
          ...DEFAULT_ROOMS[i]?.user,
          ...room.user,
        },
      }));
    } catch (error) {
      console.error("Failed to parse saved rooms:", error);
      return DEFAULT_ROOMS;
    }
  });

  const [messagesByRoom, setMessagesByRoom] = useState(() => {
    try {
      const saved = localStorage.getItem("messagesByRoom");
      return saved ? JSON.parse(saved) : {};
    } catch (err) {
      console.error("Failed to parse saved messagesByRoom:", err);
      return {};
    }
  });

  const receiveMessage = (roomId, text) => {
    setTypingByRoom((prev) => ({ ...prev, [roomId]: false }));

    const room = rooms.find((r) => r.id === roomId);
    if (!room) return;

    const newMessage = {
      id: Date.now(),
      roomId,
      text,
      senderId: room.user.id,
      senderName: room.user.name,
      senderAvatar: room.user.avatarUrl,
      timestamp: Date.now(),
      status: "delivered",
    };

    setMessagesByRoom((prev) => ({
      ...prev,
      [roomId]: [...(prev[roomId] || []), newMessage],
    }));

    setRooms((prev) =>
      prev.map((room) =>
        room.id === roomId
          ? {
              ...room,
              lastMessage: text,
              lastMessageAt: newMessage.timestamp,
            }
          : room,
      ),
    );
  };

  const sendMessage = (roomId, text) => {
    const newMessage = {
      id: Date.now(),
      roomId,
      text,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderAvatar: currentUser.avatarUrl,
      timestamp: Date.now(),
      status: "sent",
    };

    setMessagesByRoom((prev) => ({
      ...prev,
      [roomId]: [...(prev[roomId] || []), newMessage],
    }));

    setRooms((prev) =>
      prev.map((room) =>
        room.id === roomId
          ? {
              ...room,
              lastMessage: text,
              lastMessageAt: newMessage.timestamp,
            }
          : room,
      ),
    );

    setTimeout(() => {
      setTypingByRoom((prev) => ({
        ...prev,
        [roomId]: true,
      }));
    }, 800);

    setTimeout(() => {
      setMessagesByRoom((prev) => ({
        ...prev,
        [roomId]: prev[roomId].map((m) =>
          m.id === newMessage.id ? { ...m, status: "delivered" } : m,
        ),
      }));
    }, 1000);

    setTimeout(() => {
      receiveMessage(roomId, "Okay");
    }, 2000);
  };

  const markRoomAsRead = (roomId) => {
    setMessagesByRoom((prev) => ({
      ...prev,
      [roomId]: (prev[roomId] || []).map((m) =>
        m.status === "delivered" ? { ...m, status: "read" } : m,
      ),
    }));
  };

  const getUnreadCount = (roomId) => {
    return (messagesByRoom[roomId] || []).filter(
      (m) => m.sender !== "me" && m.status === "delivered",
    ).length;
  };

  useEffect(() => {
    try {
      localStorage.setItem("messagesByRoom", JSON.stringify(messagesByRoom));
    } catch (error) {
      console.error("Failed to save messages:", error);
    }
  }, [messagesByRoom]);

  useEffect(() => {
    try {
      localStorage.setItem("rooms", JSON.stringify(rooms));
    } catch (error) {
      console.error("Failed to save rooms:", error);
    }
  }, [rooms]);

  return (
    <ChatContext.Provider
      value={{
        rooms,
        messagesByRoom,
        sendMessage,
        receiveMessage,
        markRoomAsRead,
        getUnreadCount,
        typingByRoom,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
