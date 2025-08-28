import { createSlice } from "@reduxjs/toolkit";

type User = {
    id: string;
    name: string;
    phone: string;
    email?: string;
    // add more fields if your backend sends them
};

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
}

const initialState: AuthState = {
    user: localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user") as string)
        : null,
    token: localStorage.getItem("token"),
    isAuthenticated: !!localStorage.getItem("token"),
    loading: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { user, token } = action.payload;
            state.user = user;
            state.token = token;
            state.isAuthenticated = true;

            if (token) {
                localStorage.setItem("token", token);
            }
            if (user) {
                localStorage.setItem("user", JSON.stringify(user));
            }
        },
        setUser: (state, action) => {
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
});

export const { setCredentials, setUser, logout, setLoading } =
    authSlice.actions;
export default authSlice.reducer;
