import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkAuthService } from "../../redux/service.js";
import { signUpService } from "../../redux/service.js";
export const checkAuth = createAsyncThunk('auth/checkAuth',checkAuthService)
export const signUp  = createAsyncThunk('auth/signUp',signUpService)
export const authSlice = createSlice({
    name : 'auth',
    initialState : {
        authUser : null,
        isSigningUp : false,
        isLoggingIn  : false,
        isUpdatingProfile : false,
        isCheckingAuth : true,
        onlineUsers : []
    },
    extraReducers : (builder)=>{
        builder
        .addCase(checkAuth.pending,(state)=>{
            state.isCheckingAuth = true
        })
        .addCase(checkAuth.fulfilled,(state,action)=>{
            state.authUser = action.payload
            state.isCheckingAuth = false;
        })
        .addCase(checkAuth.rejected,(state)=>{
            state.authUser = null
            state.isCheckingAuth = false;
        })

        
        .addCase(signUp.pending, (state)=>{
            state.isSigningUp = true;
        })
        .addCase(signUp.fulfilled,(state,action)=>{
            state.authUser = action.payload
            state.isSigningUp = false
        })
        .addCase(signUp.rejected,(state)=>{
            state.isSigningUp = false;
        })

    }

})

export default authSlice.reducer