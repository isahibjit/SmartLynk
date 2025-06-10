
import { axiosInstance } from "../lib/axios.js"

export const checkAuthService = async (_, thunkApi) => {
    try {
        const response = await axiosInstance.get("/auth/check")
        return response.data
    } catch (error) {
        return thunkApi.rejectWithValue(error.response.data.message || "User is not Authorized")
    }
}

export const signUpService  = async(formData)=>{
    try {
        console.log(formData)
        return formData
    } catch (error) {
        
    }
    // try {
    //     const response = await axiosInstance.post("/signup")
    // } catch (error) {
        
    // }
}