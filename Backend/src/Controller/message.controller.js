import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketIdByUserId, io } from "../lib/socket.js";
import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";
import User from "../models/user.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { _id: senderId } = req.user;
    const { id: receiverId } = req.params;
    const { text, image } = req.body;

    let imageUrl;

    // 1. Upload image if provided
    if (image) {
      const imageResponse = await cloudinary.uploader.upload(image);
      imageUrl = imageResponse.secure_url;
    }

    // 2. Find or create conversation
    let conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        members: [senderId, receiverId],
        lastMessage: {
          text,
          image: imageUrl,
          senderId,
          createdAt: new Date(),
        },
      });
    }

    // 3. Create and save message
    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    // 4. Update lastMessage in conversation
    conversation.lastMessage = {
      text,
      image: imageUrl,
      senderId,
      createdAt: newMessage.createdAt,
    };

    await conversation.save();

    // 5. Emit socket event if receiver is online
    const receiverSocketId = getReceiverSocketIdByUserId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(200).json(newMessage);
  } catch (error) {
    console.error("Error in sendMessage:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const getUsersForSidebar = async (req, res) => {
   // get their name, current message, profile image, last online
   try {
      const loggedInUser = req.user._id;
      // find users who's id is not equal to the loggedIn users id and we don't need a password 
      const FilteredUsers = await User.find({ _id: { $ne: loggedInUser } }).select("-password")
      res.status(200).json(FilteredUsers)
   } catch (error) {
      console.log("Error in Message Controller ", error)
      res.status(500).json({ message: "Internal Error Occurred" })
   }
}

export const getMessages = async (req, res) => {
   try {
      const { id: hisId } = req.params;
      const myId = req.user._id;
      const messages = await Message.find({
         $or: [
            { senderId: myId, receiverId: hisId },
            { senderId: hisId, receiverId: myId }
         ]
      });

      res.status(200).json(messages);
   } catch (error) {
      console.log("Error in getMessages controller: ", error.message);
      res.status(500).json({ error: "Internal server error" });
   }
};