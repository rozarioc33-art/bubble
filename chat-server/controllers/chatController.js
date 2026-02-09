import Chat from "../models/Chat.js";

export const createOrGetChat = async (req, res) => {
  const { userId } = req.body;

  // 1️⃣ Check if chat already exists
  let chat = await Chat.findOne({isGroup: false, users: {$all: [req.user._id, userId]}});

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

export const getMyChats = async (req, res) => {
  try {
    const chats = await Chat.find({
      users: {$in: [req.user._id]}
    })
      .populate("users", "name email")
      .populate({
        path: "lastMessage",
        populate: {
          path: "sender",
          select: "name email",
        },
      })
      .sort({updatedAt: -1})

      res.status(200).json(chats);
  } catch (error) {
     res.status(500).json({ message: error.message });
  }
}
