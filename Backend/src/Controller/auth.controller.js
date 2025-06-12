import bcrypt from "bcrypt"
import User from "../models/user.model.js"
import { generateToken } from "../lib/utils.js"
import cloudinary from "../lib/cloudinary.js"
export const signup = async (req, res) => {
    
    const { fullname, email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (user) return res.status(401).json({ message: "User already exists" })
        const salt = await bcrypt.genSalt(10)

        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = new User({
            fullname,
            email,
            password: hashedPassword,
        })
        if (newUser) {
            // get the userId first to generate a token
            generateToken(newUser._id, res)
            await newUser.save()
            res.status(201).json({
                _id: newUser._id,
                fullname: newUser.fullname,
                email: newUser.email,
                profilePic: newUser.profilePic
            })
        }
        else {
            console.log("Invalid user details")
            return res.status(401).json({ message: "Invalid User Details" })
        }
    } catch (error) {
        console.log("Error In authController", error)
        return res.status(500).json({ message: "Internal Server Error", error })
    }
}

export const signin = async (req, res) => {

    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user) return res.status(400).json({ message: "Invalid Credentials" })
        const correctPassword = await bcrypt.compare(password, user.password)
        if (!correctPassword) return res.status(400).json({ message: "Invalid Credentials" })

        generateToken(user._id, res)

        res.status(200).json({
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            profilePic: user.profilePic,
        });
    } catch (error) {
        console.log("Error in authController Signin ", error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 })
        res.status(200).json({ message: "Logged out Successfully" })
    } catch (error) {
        console.log("Error in authController @ logout", error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const check = async (req, res) => {
    try {
        res.status(200).json(req.user)
    } catch (error) {
        console.log("Error in checkRoute", error)
        res.status(500).json({ message: "Internal Server Error" })
    }

}

export const updateProfile = async (req, res) => {
    try {
        const { profilePic } = req.body
        const userId = req.user._id
        
        if(profilePic === "") {
                const uploadedUser = await User.findByIdAndUpdate(userId , { profilePic: "" }, { new: true })
                return res.status(200).json(uploadedUser)
        }
        if (!profilePic) return res.status(400).json({ message: "Profile image is required!" })
        const updatedData = await cloudinary.uploader.upload(profilePic)
        const uploadedUser = await User.findByIdAndUpdate(userId , { profilePic: updatedData.secure_url }, { new: true })

        res.status(200).json(uploadedUser)
    } catch (error) {
        console.log('Error at update profile in authController', error)
        res.status(500).json({ message: "Internal Server Error"})
    }
}