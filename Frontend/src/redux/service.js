
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

export const signOutService = async (_, thunkApi) => {
    try {
        const response = await axiosInstance.post("/auth/logout")
        return response.data
    } catch (error) {
        return thunkApi.rejectWithValue(error.response.data.message || "Couldn't Signout")
    }
}

// message api services

export const updateProfileService = async (profilePic, thunkApi) => {
    try {
        const response = await axiosInstance.post("/auth/update-profile", { profilePic })
        return response.data
    } catch (error) {
        return thunkApi.rejectWithValue(error.response.data.message || "Coudn't update the profile image")
    }
}

export const getUsersForSidebarService = async (_, thunkApi) => {
    try {
        const response = await axiosInstance.get("/message/get-users");
        return response.data
    } catch (error) {
        return thunkApi.rejectWithValue(error.response.message) || "Couldn't get the current users"
    }
}

export const sendMessageService = async (sendMessageData, thunkApi) => {
    try {
        const { formData, id } = sendMessageData
        const response = await axiosInstance.post(`/message/send/${id}`, formData)
        return response.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.response.message)
    }
}
export const getMessagesService = async(id,thunkApi)=>{
    try {
        const response = await axiosInstance.get(`message/get/${id}`)
        return response.data
    } catch (error) {
        return thunkApi.rejectWithValue(error.response.message)
    }
}