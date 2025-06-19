
import { io } from "socket.io-client";
import { setSocket } from "../features/auth/authSlice";
import { setMessages } from "../features/chat/chatSlice";
let socketInstance = null


export const connectSocket = () => (dispatch, getState) => {
    const { authUser } = getState().auth
    if (!authUser || socketInstance?.connected) return
    socketInstance = io('http://localhost:5000', {

        query: {
            userId: authUser._id
        }
    })
    socketInstance.on('connect', () => {
        dispatch(setSocket(socketInstance))
        console.log('this is how the socket looks', socketInstance)
    })

}
export const disconnectSocket = () => (dispatch, getState) => {
    const { socket } = getState().auth
    if (socket?.connected) {
        socketInstance.disconnect()
        dispatch(setSocket(null))
    }
    console.log('disconnected')
}

export const subscribeToMessage = () => (dispatch, getState) => {
    const { selectedUser} = getState().chat
    if(!selectedUser) return
    const {socket} = getState().auth
    if (!socket || !selectedUser) return
    socket.on('newMessage', (message) => {
    if(message.senderId === selectedUser._id){
        const newMessages = [...getState().chat.messages, message]
        dispatch(setMessages(newMessages))
    }
    });
}