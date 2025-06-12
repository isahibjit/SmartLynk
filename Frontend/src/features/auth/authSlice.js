import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkAuthService, signInService, signOutService, updateProfileService } from "../../redux/service.js";
import { signUpService } from "../../redux/service.js";
import toast from "react-hot-toast";
export const checkAuth = createAsyncThunk('auth/checkAuth', checkAuthService)
export const signUp = createAsyncThunk('auth/signup', signUpService)
export const signIn = createAsyncThunk('/auth/signin', signInService)
export const signOut = createAsyncThunk('/auth/logout',signOutService)
export const updateProfile = createAsyncThunk('/auth/update-profile',updateProfileService)

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        authUser: null,
        isSigningUp: false,
        isSigningOut : false,
        isLoggingIn: false,
        isUpdatingProfile: false,
        isCheckingAuth: true,
        onlineUsers: []
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkAuth.pending, (state) => {
                state.isCheckingAuth = true
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.authUser = action.payload
                state.isCheckingAuth = false;
            })
            .addCase(checkAuth.rejected, (state) => {
                state.authUser = null
                state.isCheckingAuth = false;
            })


            .addCase(signUp.pending, (state) => {
                state.isSigningUp = true;
            })
            .addCase(signUp.fulfilled, (state, action) => {
                state.authUser = action.payload
                state.isSigningUp = false
            })
            .addCase(signUp.rejected, (state) => {
                state.isSigningUp = false;
            })

            .addCase(signIn.pending, (state) => {
                state.isLoggingIn = true
            })
            .addCase(signIn.fulfilled, (state, action) => {
                state.authUser = action.payload
                state.isLoggingIn = false;
            })
            .addCase(signIn.rejected, (state,action) => {
                state.isLoggingIn = false;
            })

            .addCase(signOut.pending,(state)=>{
                state.isSigningOut = true
            })
            .addCase(signOut.fulfilled,(state)=>{
                state.isSigningOut = false
                state.authUser = null
            })
            .addCase(signOut.rejected,(state)=>{
                state.isSigningOut = false
            })

            .addCase(updateProfile.pending,(state)=>{
                state.isUpdatingProfile = true;
            })
            .addCase(updateProfile.fulfilled,(state)=>{
                state.isUpdatingProfile = false;
            })
            .addCase(updateProfile.rejected,(state)=>{
                state.isUpdatingProfile = false;
            })
    }

})

export default authSlice.reducer