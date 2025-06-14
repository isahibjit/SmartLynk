import { Router } from "express";
import { isAuthenticated } from "../middleware/user.auth.middleware.js";
import { getMessages, getUsersForSidebar, sendMessage } from "../Controller/message.controller.js";
const router = Router()
//send the messages
router.post("/send/:id",isAuthenticated,sendMessage)
// get the message
router.get("/get-users",isAuthenticated,getUsersForSidebar)
//  you'll also have to get the messages for each chatbox
router.get("/get/:id",isAuthenticated,getMessages)
export default router