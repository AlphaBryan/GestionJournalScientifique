import {createSlice} from "@reduxjs/toolkit";
import {authorReducers} from "./author";
import {administratorReducers} from "./administrator";

export type LoginRequest = { email: string; password: string };

export interface AuthSlice {
    authError: boolean;
    token?: string;
    authUser?: any;
    role?: 'author' | 'evaluator' | 'administrator';
}

const authUser = localStorage.getItem('authUser');
const initialState: AuthSlice = {
    authError: false,
    token: localStorage.getItem('token') ?? undefined,
    authUser: authUser ? JSON.parse(authUser) : undefined,
    role: localStorage.getItem('role') as any ?? undefined,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.authUser = undefined;
            state.role = undefined;
            state.token = undefined;
            localStorage.removeItem('token');
            localStorage.removeItem('authUser');
            localStorage.removeItem('role');
        }
    },
    extraReducers(builder) {
        authorReducers(builder);
        administratorReducers(builder);
    }
})

export const authActions = authSlice.actions;

export default authSlice.reducer;