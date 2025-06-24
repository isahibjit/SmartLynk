import { Router } from "express"
import { isAuthenticated } from "../middleware/user.auth.middleware.js"
import { generateText } from "../lib/genai.js"
const router = Router()

router.post("/get-response", isAuthenticated, async (req, res) => {
    if (!req.body) res.status(400).json({ message: "No Prompt was given" })
    const prompt = req.body
    const user = req.user
    const response = await generateText(prompt, user)
    res.json({ message: response })
})

export default router