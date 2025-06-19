
import { io } from "socket.io-client";
import { setSocket } from "../features/auth/authSlice";
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
    const {socket} = getState().auth
    if (socket?.connected) {
        socketInstance.disconnect()
        dispatch(setSocket(null))
    }
    console.log('disconnected')
}