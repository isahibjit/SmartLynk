import { Router } from "express"
import { isAuthenticated } from "../middleware/user.auth.middleware.js"

const router = Router()

router.post("/get-response",isAuthenticated,async (req,res)=>{
    const {prompt} = req.body
    const user = req.user
    const response = await generateText(prompt,user)
    res.json({message : response})
})

export default router