import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "../components/user/userSlice";
import genreSlice from "../components/genre/genreSlice";
import eventSlice from "../components/event/eventSlice";

const rootReducer = combineReducers({
    user: userSlice,
    genre: genreSlice,
    event: eventSlice
});

export default rootReducer;