import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUsersForSidebarService } from "../../../redux/service";
const getUsersForSidebar = createAsyncThunk("/message/get-users",getUsersForSidebarService)
const chatSlice = createSlice({
    name : "chat",
    initialState : {
        messages  : [],
        users : [],
        selectedUser : null,
        isUserLoading : false,
        isMessageLoading : false,
    },
    extraReducers : (builder)=>{
        builder
        .addCase(getUsersForSidebar.pending,(state)=>{
            state.isUserLoading = true;
        })
        .addCase(getUsersForSidebar.fulfilled,(state,action)=>{
            state.isUserLoading = false;
            state.users = action.payload
        })
        .addCase(getUsersForSidebar.rejected,(state)=>{
            state.isUserLoading = false
        })
    }
})

export default chatSlice.reducer