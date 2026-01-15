import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:4000";

export default function useChat({room, username}) {
    console.log("useChat called with:", { room, username });
    const [messages, setMessages] = useState([]);
    const socketRef = useRef(null);

    useEffect(() => {
        if (!room || !username) return;

        //connect socket
        const socket = io(SOCKET_URL);
        socketRef.current = socket;

        //join room
        socket.emit("join", {room, username});

        //listen for incoming messages
        socket.on("message", (msg) => {
            console.log("message from server:", msg);
            setMessages((prev) => [...prev, msg]);
        });

        //cleanup on unmount / room change
        return () => {
            socket.disconnect();
        };
    }, [room, username]);

     // send message
  const sendMessage = (text) => {
    if (!text.trim()) return;
    socketRef.current?.emit("message", {
      room,
      text,
    });
  };

  return {
    messages,
    sendMessage,
  };
}