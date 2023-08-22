import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "dark",
    userId: "",
    token: "",
};

const globalSlice = createSlice({
    name: "global",
    initialState: () => {
        const token = localStorage.getItem("token");
        if (!token)
            return {
                mode: "dark",
                userId: "",
                token: "",
            };
        return {
            mode: "dark",
            userId: JSON.parse(localStorage.getItem("userId")),
            token,
        };
    },
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
            localStorage.setItem("token", state.token);
            localStorage.setItem("userId", JSON.stringify(state.userId));
        },
        logoutUser: (state) => {
            state.userId = "";
            state.token = "";
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
        },
    },
});

export const { setMode, setUserId, logoutUser, loginUser } =
    globalSlice.actions;
export default globalSlice;
