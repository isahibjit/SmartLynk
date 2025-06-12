import {configureStore} from "@reduxjs/toolkit"
import authReducer from "../features/auth/authSlice.js"
import chatReducer from "../features/chat/chatSlice.js"
export default configureStore({
    reducer : {
        auth : authReducer,
        chat : chatReducer
    },
})