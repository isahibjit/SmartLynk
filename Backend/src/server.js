import Express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"
import { connectDb } from "./lib/db.js"
import cookieParser from "cookie-parser"
dotenv.config()
const PORT = process.env.PORT
const app = Express()
app.use(Express.json())

app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/message", messageRoutes)
app.get("/",(req,res)=>{
    res.send("Hello There")
})


connectDb().then(app.listen((PORT), () => {
    console.log(`Server Connected to Port ${PORT}`)
}))