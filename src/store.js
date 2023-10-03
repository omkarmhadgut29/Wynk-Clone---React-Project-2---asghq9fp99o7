import { configureStore } from "@reduxjs/toolkit";
import songReducer from "./redux/songs/songSlice";
import userReducer from "./redux/users/userSlice";
import subscriptionReducer from "./redux/subscription/subscriptionSlice";

export const store = configureStore({
    reducer: {
        songs: songReducer,
        user: userReducer,
        subscription: subscriptionReducer,
    },
});
