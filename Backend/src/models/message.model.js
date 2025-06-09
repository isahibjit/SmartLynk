import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
    receiverId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    senderId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    text: {
        type: String,
    },
    image: {
        type: String
    },

},
    { timestamp: true }
)
const Message = mongoose.model("Message",messageSchema)

export default Message