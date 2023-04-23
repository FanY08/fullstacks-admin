import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "dark",
    userId: "",
    token: "",
};

const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setUserId: (state, actions) => {
            state.userId = actions.payload.userId;
        },
        loginUser: (state, actions) => {
            state.userId = actions.payload.userId;
            state.token = actions.payload.token;
        },
        logoutUser: (state) => {
            state.userId = "";
            state.token = "";
        },
    },
});

export const { setMode, setUserId, logoutUser, loginUser } =
    globalSlice.actions;
export default globalSlice;
