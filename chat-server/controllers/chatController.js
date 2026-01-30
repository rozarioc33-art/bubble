import Chat from "../models/Chat.js";

export const createOrGetChat = async (req, res) => {
  const { userId } = req.body;

  // 1️⃣ Check if chat already exists
  let chat = await Chat.findOne({
    isGroup: false,
    users: { $all: [req.user._id, userId] },
  }).populate("users", "-password");

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
