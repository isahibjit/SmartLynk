import {configureStore} from "@reduxjs/toolkit"
import authReducer from "../features/auth/authSlice.js"
import chatReducer from "../features/chat/chatSlice.js"
import themeReducer from "../features/theme/themeSlice.js"
export default configureStore({
    reducer : {
        auth : authReducer,
        chat : chatReducer,
        theme : themeReducer
    },
    middleware : (getDefaultMiddleware)=>
        getDefaultMiddleware({
            serializableCheck : false
        })
    
})