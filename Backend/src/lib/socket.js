import express from "express"
import { createServer } from "http"
import { Server } from "socket.io"
import dotenv from "dotenv"
import Message from "../models/message.model.js"
dotenv.config()
const app = express()
const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: [process.env.FRONTEND_URL],
        methods: ["GET", "POST"],
        credentials: true,
    }
})
const userSocketMap = {}
// use an array socketMap for keeping track of users who just joined 


export const getReceiverSocketIdByUserId = (userId) => {
    return userSocketMap[userId];


}
io.on('connection', (socket) => {
    console.log('new connection established', socket.id)
    const userId = socket.handshake.query.userId

    socket.on("join", (userId) => {
        console.log(`Socket ${socket.id} joined room ${userId}`);
        socket.join(userId);
    })
    if (userId) {
        userSocketMap[userId] = socket.id
    }
    // send events to all connected clients
    socket.emit('getOnlineUsers', Object.keys(userSocketMap))
    socket.on('typing', ({ to }) => {
        const receiverSocketId = getReceiverSocketIdByUserId(to)
        if (receiverSocketId) {
            io.to(receiverSocketId).emit('typing', { from: userId })
        }
    })
    socket.on('stopTyping', ({ to }) => {
        const receiverSocketId = getReceiverSocketIdByUserId(to)
        if (receiverSocketId) {
            io.to(receiverSocketId).emit('stopTyping', { from: userId })
        }
    })
    socket.on('markAsSeen', async ({ senderId, receiverId }) => {
        try {
            await Message.updateMany({
                senderId,
                receiverId,
                seen: false
            }, { $set: { seen: true } })
            io.to(senderId.toString()).emit("messagesSeenByReceiver", { receiverId });
        } catch (error) {
            console.log('Error', error)
        }

    })

    socket.on('sendNotifications', ({ unseenMessages, senderId }) => {
        console.log(unseenMessages)
        io.to(senderId.toString()).emit('receiveNotifications', unseenMessages)
    })
    socket.on('disconnect', () => {
        console.log('user disconnected', socket.id)
    })


})

export { io, app, server }
