import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { setSocket } from "../features/auth/authSlice";

export const connectSocket = (dispatch, state) => {
    const dispatch = useDispatch()
    const { authUser } = useSelector((state) => state.auth)
    if (!authUser || socket?.connected) return
    const socket = io('http://localhost:5000', {
        query: {
            userId: authUser._id
        }
    })
    socket.on('connect', () => {
        dispatch(setSocket(socket))
        console.log('this is how the socket looks', socket)
    })


}