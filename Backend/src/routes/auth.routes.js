import { Router } from "express";
import { check, logout, signin, signup, updateProfile } from "../Controller/auth.controller.js";
import {isAuthenticated, validateUser} from "../middleware/user.auth.middleware.js";
import { generateText } from "../lib/genai.js";
const router = Router()

router.post("/signup",validateUser("signin"),signup)
router.post("/signin",validateUser("signin"),signin)
router.post("/logout",logout)
router.get("/check",isAuthenticated,check)

router.post("/update-profile",isAuthenticated,updateProfile)

router.post("/get-response",isAuthenticated,async (req,res)=>{
    const {prompt} = req.body
    const user = req.user
    const response = await generateText(prompt,user)
    res.json({message : response})
})

export default router