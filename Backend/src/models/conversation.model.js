import mongoose, { mongo } from 'mongoose';

const conversationSchema = mongoose.Schema({
    members : [
        {
            type : mongoose.Schema.ObjectId,
            ref : "User",
            required: true
        },
    ],
    lastMessage : {
        type : mongoose.Schema.ObjectId,
        text : {
            type: String,
        },
        image: {
            type: String
        },
        senderId : {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true
        }
    },
},
{timestamps: true}
)

export default mongoose.model("Conversation", conversationSchema);