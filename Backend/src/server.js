import Express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"
import conversationRoutes from "./routes/conversation.route.js"
import aiRoutes from "./routes/ai.routes.js"
import { connectDb } from "./lib/db.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import morgan from "morgan"
import {app, io, server} from "./lib/socket.js"


dotenv.config()
const PORT = process.env.PORT
app.use(Express.json({ limit: '10mb' }));  
app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials : true
}))
app.use(morgan("dev"))
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/message", messageRoutes)
app.use("/api/conversation", conversationRoutes)
app.use('/api/ai',aiRoutes)
app.get("/",(req,res)=>{
    res.send("Hello There")
})




connectDb().then(server.listen((PORT), () => {
    console.log(`Server Connected to Port ${PORT}`)
}))