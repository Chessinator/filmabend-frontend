import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../../backendApi";
const api = new Api();
const initialState = {
  account: false,
  status: "idle",
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.account = false;
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
      })
      .addCase(addFavGenreAsync.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(addFavGenreAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.account.favoriteGenres = action.payload.favoriteGenres;
      })
      ;
  },
})

export const loginAsync = createAsyncThunk(
  "user/login",
  async (loginData) => {
    console.log(loginData);
    const response = await api.login.userLogin(loginData);
    return response.data;
  }
)

export const registerAsync = createAsyncThunk(
  "user/register",
  async (registerData) => {
    console.log(registerData);
    const response = await api.accounts.postCollectionResourceAccountPost(registerData)
    return response.data;
  }
)
export const addFavGenreAsync = createAsyncThunk(
  "user/genre",
  async (request) => {
    console.log(request)

    const response = await api.accounts.addFavGenre(request.id, request.genre);
    return response.data;
  }
)

export const { login, logout } = userSlice.actions;


export default userSlice.reducer; 