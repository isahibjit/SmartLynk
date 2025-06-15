import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMessagesService, getUsersForSidebarService, sendMessageService } from "../../redux/service";
export const getUsersForSidebar = createAsyncThunk("/message/get-users", getUsersForSidebarService)
export const sendMessage = createAsyncThunk('/message/send',sendMessageService)
export const getMessages = createAsyncThunk('/message/get',getMessagesService)
const chatSlice = createSlice({
    name: "chat",
    initialState: {
        messages: [],
        users: [],
        selectedUser: null,
        isUserLoading: false,
        isMessageLoading: false,
        isMessageSending: false,
    },
    reducers: {
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload;
        },
        setIsSelectedForMobile: (state, action) => {
            state.isSelectedForMobile = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUsersForSidebar.pending, (state) => {
                state.isUserLoading = true;
            })
            .addCase(getUsersForSidebar.fulfilled, (state, action) => {
                state.isUserLoading = false;
                state.users = action.payload
            })
            .addCase(getUsersForSidebar.rejected, (state) => {
                state.isUserLoading = false
            })


            .addCase(sendMessage.pending,(state)=>{
                state.isMessageSending = true
            })
            .addCase(sendMessage.fulfilled,(state,action)=>{
                state.messages = action.payload
                 state.isMessageSending = false
            })
            .addCase(sendMessage.rejected,(state)=>{
                 state.isMessageSending = false
            })


            .addCase(getMessages.pending,(state)=>{
                state.isMessageLoading = true
            })
            .addCase(getMessages.fulfilled,(state,action)=>{
                state.isMessageLoading = false
                state.messages = action.payload
            })
            .addCase(getMessages.rejected,(state)=>{
                state.isMessageLoading = false
            })
    }
})
export const { setSelectedUser, setIsSelectedForMobile,selectedUser,messages, isMessageSending } = chatSlice.actions
export default chatSlice.reducer