import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "../components/user/userSlice";
import genreSlice from "../components/genre/genreSlice";

const rootReducer = combineReducers({
    user: userSlice,
    genre: genreSlice,
});

export default rootReducer;