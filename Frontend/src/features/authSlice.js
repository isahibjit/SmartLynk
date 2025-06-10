import { createSlice } from "@reduxjs/toolkit";
import { checkAuth } from "../redux/service.js";

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
        .addCase(checkAuth.rejected,(state,action)=>{
            state.authUser = null
            state.isCheckingAuth = false;
        })
    }
    
})