import axios from "axios";

export const ChatProvider = ({ children }) => {
  const socket = useRef(null);
  const { currentUser } = useUser();

  const [rooms, setRooms] = useState([]);
  const [messagesByRoom, setMessagesByRoom] = useState({});

  useEffect(() => {
    if (!currentUser) return;

    socket.current = io("http://localhost:5000");

    socket.current.emit("setup", currentUser.id);

    socket.current.on("message received", (message) => {
      const roomId = message.chat._id;

      setMessagesByRoom((prev) => ({
        ...prev,
        [roomId]: [
          ...(prev[roomId] || []),
          {
            id: message._id,
            roomId,
            text: message.content,
            senderId: message.sender._id,
            senderName: message.sender.name,
            senderAvatar: message.sender.avatarUrl,
            timestamp: message.createdAt,
            status: "delivered",
          },
        ],
      }));
    });

    return () => {
      socket.current.disconnect();
    };
  }, [currentUser]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/chat", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const formattedRooms = data.map((chat) => {
          const otherUser = chat.users.find((u) => u._id !== currentUser.id);

          return {
            id: chat._id,
            type: "dm",
            user: {
              id: otherUser._id,
              name: otherUser.name,
              avatarUrl: otherUser.avatarUrl,
              isOnline: false,
            },
            lastMessage: chat.lastMessage?.content || "",
            lastMessageAt: chat.lastMessage?.createdAt || null,
          };
        });

        setRooms(formattedRooms);
      } catch (error) {
        console.error("Failed to fetch chats:", error);
      }
    };

    if (currentUser) {
      fetchChats();
    }
  }, [currentUser]);

  const sendMessage = async (roomId, text) => {
    // unchanged
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
      (m) => m.senderId !== currentUser.id && m.status === "delivered",
    ).length;
  };

  return (
    <ChatContext.Provider
      value={{
        rooms,
        messagesByRoom,
        sendMessage,
        markRoomAsRead,
        getUnreadCount,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
