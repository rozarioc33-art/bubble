import Message from "../models/Message.js";
import Chat from "../models/Chat.js";

export const sendMessage = async (req, res) => {
    try {
        const {content, chatId} = req.body;

        if(!content || !chatId) {
            return res.status(400).json({message: "content and chatId required"});
        }

        let message = await Message.create({
            sender: req.user._id,
            content,
            chat: chatId,
        });

        await Chat.findByIdAndUpdate(chatId, {
          lastMessage: message._id,
        });

        message = await message.populate("sender", "name email");
        message = await message.populate("chat");

        res.status(201).json(message);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

export const getMessages = async (req, res) => {
  try {
    const { chatId } = req.params;

    const messages = await Message.find({ chat: chatId })
      .populate("sender", "name email")
      .populate("chat");

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};