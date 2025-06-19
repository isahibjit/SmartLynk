import Conversation from "../models/conversation.model.js";

export const getConversations = async (req, res) => {
  try {
    const userId = req.user._id;

    const conversations = await Conversation.find({
      members: userId,
    })
      .sort({ "lastMessage.createdAt": -1 })
      .populate({
        path: "members",
        select: "_id fullname profilePic",
      })
      .lean();

    const result = conversations.map((conv) => {
      const otherUser = conv.members.find(
        (member) => member._id.toString() !== userId.toString()
      );

      return {
        _id: conv._id,
        user: otherUser, // the person you're chatting with
        lastMessage: conv.lastMessage,
      };
    });

    res.status(200).json(result);
  } catch (err) {
    console.error("Failed to get conversations", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
