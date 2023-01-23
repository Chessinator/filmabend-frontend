import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../../backendApi";

const api = new Api();
const initialState = {
    genres: [],
    status: "idle",
};

export const getGenres = createAsyncThunk(
    "genre/load",
    async (loginData) => {
        const response = await api.genres.getCollectionResourceGenreGet1(loginData);
        return response.data;
    }
)

const genreSlice = createSlice({
    name: "genre",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getGenres.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getGenres.fulfilled, (state, action) => {
                state.status = 'idle';
                state.genres = action.payload._embedded.genres.sort((a,b) => a.name < b.name ? -1 : 1);
            });
    },
})



export default genreSlice.reducer; 