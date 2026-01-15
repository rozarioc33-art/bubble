import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log("connected:", socket.id);

  socket.on("join", ({ room, username }) => {
    socket.join(room);
    socket.data.username = username;
    socket.data.room = room;
  });

  socket.on("message", ({ room, text }) => {
    const msg = {
      _id: Date.now().toString(),
      room,
      username: socket.data.username,
      text,
      createdAt: new Date(),
    };

    io.to(room).emit("message", msg);
  });
});

server.listen(4000, () =>
  console.log("Chat server running on http://localhost:4000")
);
