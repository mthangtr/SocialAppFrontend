import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo: null,
};

if (typeof window !== "undefined" && localStorage.getItem("userInfo")) {
    initialState.userInfo = JSON.parse(localStorage.getItem("userInfo"));
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = action.payload;
            if (typeof window !== "undefined") {
                localStorage.setItem("userInfo", JSON.stringify(action.payload));
            }
        },
        logout: (state) => {
            state.userInfo = null;
            if (typeof window !== "undefined") {
                localStorage.clear();
            }
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
