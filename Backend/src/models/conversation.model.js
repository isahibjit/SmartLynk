import mongoose from 'mongoose';

const conversationSchema = mongoose.Schema({
    members: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true
        },
    ],
    lastMessage: {
        text: {
            type: String,
        },
        image: {
            type: String
        },
        senderId: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true
        },
              createdAt: Date,
    },
},
    { timestamps: true }
)

export default mongoose.model("Conversation", conversationSchema);