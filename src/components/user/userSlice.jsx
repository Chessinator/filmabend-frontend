import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../../backendApi";
const api = new Api();
const initialState = {
  account: JSON.parse(sessionStorage.getItem("account")) || false,
  guestlist: [],
  userList:["nico","chris","peter","nadja","charles","pascal","pedro"],
  status: "idle",
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.account = false;
      sessionStorage.setItem("account", false);
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
        sessionStorage.setItem("account", JSON.stringify(action.payload));
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
        state.account.favoriteGenres = action.payload.favoriteGenres.sort((a,b) => a.name < b.name ? -1 : 1);
        sessionStorage.setItem("account", JSON.stringify(state.account));
      })
      .addCase(deleteFavGenreAsync.fulfilled, (state, action) =>  {
        state.status = 'idle';
        state.account.favoriteGenres = state.account.favoriteGenres.filter(genre => genre.id !== action.payload);
        sessionStorage.setItem("account", JSON.stringify(state.account));
      })
      .addCase(findUserAsync.fulfilled, (state, action) => {
          state.status = "idle"; 
          state.guestlist =  [...state.guestlist, action.payload];
      })
      .addCase(getAllUsersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllUsersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userList = action.payload;
      })
      ;
  },
})

export const loginAsync = createAsyncThunk(
  "user/login",
  async (loginData) => {
    const response = await api.login.userLogin(loginData);
    return response.data;
  }
)
export const findUserAsync = createAsyncThunk(
  "user/findUser",
  async(username) => {
    const response = await api.accounts.executeSearchAccountGet({name: username});
    return response.data;
  }
)
export const getAllUsersAsync = createAsyncThunk(
  "user/getAllUsernames",
  async() => {
    let response = await api.usernames.getAllUsernames();
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
  "user/genre/add",
  async (request) => {
    const response = await api.accounts.addFavGenre(request.id, request.genre);
    return response.data;
  }
)
export const deleteFavGenreAsync = createAsyncThunk(
  "user/genre/delete",
  async (request) => {
    await api.accounts.deletePropertyReferenceIdAccountDelete(request.id, request.propertyId);
    return request.propertyId;
  }
)

export const { login, logout } = userSlice.actions;


export default userSlice.reducer; 