import express from "express"
import { createServer } from "http"
import { Server } from "socket.io"
import dotenv from "dotenv"
dotenv.config()
const app = express()
const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: [process.env.FRONTEND_URL],
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

    if (userId) {
        userSocketMap[userId] = socket.id
    }
    socket.on('disconnect', () => {
        console.log('user disconnected', socket.id)
    })
})

export { io, app, server }
