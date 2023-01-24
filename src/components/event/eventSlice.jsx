import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../../backendApi";

const api = new Api();
const initialState = {
    events: [],
    status: "idle",
};

export const createEvent = createAsyncThunk(
    "event/create",
    async (data) => {
        const response = await api.eventPlans.postCollectionResourceEventplanPost(data);
        return response.data;
    }
)

const eventSlice = createSlice({
    name: "event",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(createEvent.fulfilled, (state, action) => {
                state.status = 'idle';
                state.events = action.payload;
            });
    },
})

export default eventSlice.reducer;