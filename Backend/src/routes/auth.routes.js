import { Router } from "express";
import { check, logout, signin, signup, updateProfile } from "../Controller/auth.controller.js";
import {isAuthenticated, validateUser} from "../middleware/user.auth.middleware.js";
const router = Router()

router.post("/signup",validateUser("signin"),signup)
router.post("/signin",validateUser("signin"),signin)
router.post("/logout",logout)
router.get("/check",isAuthenticated,check)

router.post("/update-profile",isAuthenticated,updateProfile)



export default router