import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {Api} from "../backendApi";

const api = new Api();
const initialState = {
    account: "",
    status: "idle",
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state) => {
            state.account=null;
        },
    },
    extraReducers: (builder) => {
        builder
          .addCase(loginAsync.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(loginAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.account = action.payload;
          })
          .addCase(registerAsync.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(registerAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.account = action.payload;
          });
        },
})

export const loginAsync = createAsyncThunk(
    "user/login",
    async (loginData) => {
        const response = await api.login.userLogin(loginData);
        return response.data;
    }
)

export const registerAsync = createAsyncThunk(
    "user/register",
    async (registerData) => {


        const response = await fetch("http://localhost:8080/accounts", {
            method: "post",
            body: registerData,
            headers:{
                "Accept" :"*/*",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin" : "*"
            }
        })
        return response.data;
    }
)

export const {login, logout} = userSlice.actions;


export default userSlice.reducer; 