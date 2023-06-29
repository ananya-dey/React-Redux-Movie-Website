import { configureStore } from "@reduxjs/toolkit";
import MovieReducer from "./Movies/MovieSlice";

export const store = configureStore({
    reducer: {
        movie: MovieReducer
    }
});