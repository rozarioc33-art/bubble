import Chat from "../models/Chat.js";

export const createOrGetChat = async (req, res) => {
  const { userId } = req.body;

  console.log("👉 Logged-in user:", req.user._id);
  console.log("👉 Requested userId:", userId);

  // 1️⃣ Check if chat already exists
  let chat = await Chat.findOne({isGroup: false, users: {$all: [req.user._id, userId]}});

  console.log("👉 Chat found:", chat);

  if (chat) {
    return res.status(200).json(chat);
  }

  // 2️⃣ Create new chat
  chat = await Chat.create({
    users: [req.user._id, userId],
  });

  const fullChat = await Chat.findById(chat._id).populate(
    "users",
    "-password"
  );

  res.status(201).json(fullChat);
};
