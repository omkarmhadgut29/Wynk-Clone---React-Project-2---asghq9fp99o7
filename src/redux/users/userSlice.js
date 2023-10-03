import {
    createAsyncThunk,
    createSelector,
    createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
// import { userAuth } from "./userActions";

const initialState = {
    user: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        createUser: (state, action) => {
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload));
        },
        deleteUser: (state) => {
            state.user = null;
            localStorage.removeItem("user");
        },
    },
});

export const { createUser, deleteUser } = userSlice.actions;

export const userSelector = createSelector(
    (state) => state.user.user,
    (state) => state
);

export default userSlice.reducer;
