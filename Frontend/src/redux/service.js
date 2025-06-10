import { axiosInstance } from "../lib/axios"

export const checkAuth = async (_, thunkApi) => {
    try {
        const response = await axiosInstance.get("/auth/check")
        return response.data
    } catch (error) {
        return thunkApi.rejectWithValue(error.response.data.message || "User is not Authorized")
    }
}

export const signUp  = async(formData)=>{
    try {
        const response = await axiosInstance.post("/signup")
    } catch (error) {
        
    }
}