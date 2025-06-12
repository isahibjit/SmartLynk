
import toast from "react-hot-toast"
import { axiosInstance } from "../lib/axios.js"

export const checkAuthService = async (_, thunkApi) => {
    try {
        const response = await axiosInstance.get("/auth/check")
        return response.data
    } catch (error) {
        return thunkApi.rejectWithValue(error.response.data.message || "User is not Authorized")
    }
}

export const signUpService = async (formData, thunkApi) => {
    try {
        const response = await axiosInstance.post("/auth/signup", formData)
        return response.data
    } catch (error) {
        return thunkApi.rejectWithValue(error.response.data.message || "Couldn't Signup")
    }
}

export const signInService = async (formData, thunkApi) => {
    try {
        const response = await axiosInstance.post("/auth/signin", formData)
        return response.data
    } catch (error) {
        return thunkApi.rejectWithValue(error.response.data.message || "Couldn't Signin")
    }
}

export const signOutService = async (_,thunkApi)=>{
    try {
        const response = await axiosInstance.post("/auth/logout")
        return response.data
    } catch (error) {
        return thunkApi.rejectWithValue(error.response.data.message || "Couldn't Signout")
    }
}

export const updateProfileService = async(profilePic,thunkApi)=>{
    try {
        const response = await axiosInstance.post("/auth/update-profile",{profilePic})
        return response.data
    } catch (error) {
        return thunkApi.rejectWithValue(error.response.data.message || "Coudn't update the profile image")
    }
}