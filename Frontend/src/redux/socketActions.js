
import { io } from "socket.io-client";
import { setOnlineUsers, setSocket } from "../features/auth/authSlice";
import { setMessages, setTyping } from "../features/chat/chatSlice";
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
    })
    socketInstance.on('getOnlineUsers', (userIds) => {
        dispatch(setOnlineUsers(userIds))

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
  const { selectedUser } = getState().chat;
  const { socket, authUser } = getState().auth;

  if (!selectedUser || !socket) return;

  // Prevent multiple bindings
  socket.off('newMessage');

  socket.on('newMessage', (message) => {
    // Don't add your own sent message again
    if (message.senderId === authUser._id) return;

    // Only add if the sender is the one you're chatting with
    if (message.senderId === selectedUser._id) {
      const newMessages = [...getState().chat.messages, message];
      dispatch(setMessages(newMessages));
    }
  });
};


