import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "./UserContext";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const { currentUser } = useUser();

  const [rooms, setRooms] = useState([]);
  const [messagesByRoom, setMessagesByRoom] = useState({});

  const token = localStorage.getItem("token");

  const authConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // ==============================
  // 1️⃣ Fetch Chats
  // ==============================
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/chats",
          authConfig,
        );
        console.log("rooms:", data);
        setRooms(data);
      } catch (err) {
        console.error("Failed to fetch chats:", err);
      }
    };

    if (currentUser) {
      fetchChats();
    }
  }, [currentUser]);

  // ==============================
  // 2️⃣ Fetch Messages For Chat
  // ==============================
  const fetchMessages = async (chatId) => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/messages/${chatId}`,
        authConfig,
      );

      setMessagesByRoom((prev) => ({
        ...prev,
        [chatId]: data,
      }));
    } catch (err) {
      console.error("Failed to fetch messages:", err);
    }
  };

  // ==============================
  // 3️⃣ Send Message
  // ==============================
  const sendMessage = async (chatId, content) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/messages",
        { chatId, content },
        authConfig,
      );

      setMessagesByRoom((prev) => ({
        ...prev,
        [chatId]: [...(prev[chatId] || []), data],
      }));
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        rooms,
        messagesByRoom,
        fetchMessages,
        sendMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
