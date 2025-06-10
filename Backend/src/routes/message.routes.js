import { Router } from "express";
import { isAuthenticated } from "../middleware/user.auth.middleware.js";
import { sendMessage } from "../Controller/message.controller.js";
const router = Router()
//add the messages!
router.post("/send:id",isAuthenticated,sendMessage)


export default router