import { Router } from "express";
import { isAuthenticated } from "../middleware/user.auth.middleware.js";
import { getUsersForSidebar, sendMessage } from "../Controller/message.controller.js";
const router = Router()
//add the messages!
router.post("/send:id",isAuthenticated,sendMessage)
router.get("/get-users",isAuthenticated,getUsersForSidebar)
export default router