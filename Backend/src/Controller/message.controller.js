import cloudinary from "../lib/cloudinary.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
   try {
     const { _id: senderId } = req.user
     const { id : receiverId } = req.params
     const {text, image} = req.body

     let imageUrl;
     if(image){
        //assuming the image is in base64
        const imageResponse = await cloudinary.uploader.upload(image)
        imageUrl = imageResponse.secure_url;
     }
     const newMessage = new Message({
        senderId : senderId,
        receiverId : receiverId,
        text : text,
        image : imageUrl
     })
     await newMessage.save()
     res.status(200).json(newMessage)
   } catch (error) {
        console.log("Error in messageController",error)
        res.status(500).json({message : "Internal Server Error"})
   }
}

export const getUsersForSidebar = (req,res)=>{
   // get their name, current message, profile image, last online
}