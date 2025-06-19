import express from "express"
import { createServer } from "http"
import {Server} from "socket.io"
import dotenv from "dotenv"
dotenv.config()
const app = express()
const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: [process.env.FRONTEND_URL],
    }
})
io.on('connection',(socket)=>{
    console.log('new connection established',socket.id)
    const userSocketMap = {}
    const userId = socket.handshake.query.userId

    if(userId){
        userSocketMap[userId] = socket.id
        console.log(userSocketMap)
    }
    socket.on('disconnect',()=>{
        console.log('user disconnected',socket.id)
    })
})
 // use an array socketMap for keeping track of users who just joined 

export { io, app, server }
