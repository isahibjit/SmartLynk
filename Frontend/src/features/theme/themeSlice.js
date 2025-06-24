import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
    name : "theme",
    initialState : {
        theme : localStorage.getItem('chat-theme') || "cupcake"
    },
    reducers : {
        setTheme :(state,action)=>{
            localStorage.setItem('chat-theme',action.payload)
            state.theme = action.payload
        }
    }
})

export const {setTheme} = themeSlice.actions
export default themeSlice.reducer