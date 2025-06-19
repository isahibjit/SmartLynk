import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketIdByUserId, io } from "../lib/socket.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const sendMessage = async (req, res) => {
   try {
      const { _id: senderId } = req.user
      const { id: receiverId } = req.params
      const { text, image } = req.body
      console.log("this is image",image)
      let imageUrl;
      if (image) {
         //assuming the image is in base64
         const imageResponse = await cloudinary.uploader.upload(image)
         imageUrl = imageResponse.secure_url;
      }
      const newMessage = new Message({
         senderId: senderId,
         receiverId: receiverId,
         text: text,
         image: imageUrl
      })
      await newMessage.save()
      // after saving it trigger the socket/io 

      const receiverSocketId = getReceiverSocketIdByUserId(receiverId)
      // sending the message to the receiver
      if(receiverSocketId){
         io.to(receiverSocketId).emit("newMessage",newMessage)
      }
      res.status(200).json(newMessage)
   } catch (error) {
      console.log("Error in messageController", error)
      res.status(500).json({ message: "Internal Server Error" })
   }
}

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