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
    seen : {
        type : Boolean,
        default : false,   
    }
    ,
    text: {
        type: String,
    },
    image: {
        type: String
    },

},
    { timestamps: true }
)
const Message = mongoose.model("Message",messageSchema)

export default Message