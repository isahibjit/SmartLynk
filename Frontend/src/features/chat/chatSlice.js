import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUsersForSidebarService } from "../../redux/service";
export const getUsersForSidebar = createAsyncThunk("/message/get-users",getUsersForSidebarService)
const chatSlice = createSlice({
    name : "chat",
    initialState : {
        messages  : [],
        users : [],
        selectedUser : null,
        isUserLoading : false,
        isMessageLoading : false,
    },
    reducers : {
        setSelectedUser : (state,action)=>{
            state.selectedUser = action.payload;
        }
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
export const {setSelectedUser} = chatSlice.actions
export default chatSlice.reducer