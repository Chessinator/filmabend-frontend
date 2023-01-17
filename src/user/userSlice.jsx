import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loggedIn: false,
    username: "",
    password: "",
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
            state.loggedIn=true;
            state.username=action.payload.username;
            state.password=action.payload.password;
        },
        logout: (state) => {
            state.loggedIn=false;
        },
    },
})

export const {login, logout} = userSlice.actions;


export default userSlice.reducer; 