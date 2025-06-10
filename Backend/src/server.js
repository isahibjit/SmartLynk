import Express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"
import { connectDb } from "./lib/db.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import morgan from "morgan"
dotenv.config()
const PORT = process.env.PORT
const app = Express()
app.use(Express.json())
app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials : true
}))
app.use(morgan("dev"))
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/message", messageRoutes)
app.get("/",(req,res)=>{
    res.send("Hello There")
})


connectDb().then(app.listen((PORT), () => {
    console.log(`Server Connected to Port ${PORT}`)
}))