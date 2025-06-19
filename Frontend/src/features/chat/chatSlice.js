import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getConversationsService, getMessagesService, getUsersForSidebarService, sendMessageService } from "../../redux/service";
export const getUsersForSidebar = createAsyncThunk("/message/get-users", getUsersForSidebarService)
export const sendMessage = createAsyncThunk('/message/send',sendMessageService)
export const getMessages = createAsyncThunk('/message/get',getMessagesService)
export const getConversations = createAsyncThunk('/message/get-conversations', getConversationsService)
const chatSlice = createSlice({
    name: "chat",
    initialState: {
        messages: [],
        users: [],
        selectedUser: null,
        isUserLoading: false,
        isMessageLoading: false,
        isMessageSending: false,
        conversations : [],
        typing : false,
    },
    reducers: {
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload;
        },
        setMessages : (state,action)=>{
            state.messages = action.payload
        },
        setTyping : (state,action)=>{
            state.typing = action.payload
        }
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
                state.messages.push(action.payload)
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

            // conversations
            .addCase(getConversations.pending, (state) => {
                state.isUserLoading = true;
            })
            .addCase(getConversations.fulfilled, (state, action) => {
                state.isUserLoading = false;
                state.conversations = action.payload
            })
            .addCase(getConversations.rejected, (state) => {
                state.isUserLoading = false
            })
    }
})
export const { setSelectedUser, setIsSelectedForMobile,selectedUser,messages,setTyping, setMessages, isMessageSending } = chatSlice.actions
export default chatSlice.reducer