import {ActionReducerMapBuilder, createAsyncThunk} from "@reduxjs/toolkit";
import {AuthSlice, LoginRequest} from "./slice";
import {handleHttpErrors, post} from "../../httpUtil";


export const loginAuthor = createAsyncThunk(
    'authors/login',
    async (request: LoginRequest) => {
        const res = await handleHttpErrors(post('/auth/author/login', request, {noAuth: true}));
        return {
            token: res.headers.get('authorization') as string,
            user: await res.json()
        };
    }
)

export const authorReducers = (builder: ActionReducerMapBuilder<AuthSlice>) => {
    builder.addCase(loginAuthor.fulfilled, (state, action) => {
        state.authError = false;
        state.token = action.payload.token;
        state.authUser = action.payload.user;
        state.role = 'author';
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('authUser', JSON.stringify(action.payload.user));
        localStorage.setItem('role', 'author');
    });
    builder.addCase(loginAuthor.rejected, (state, action) => {
        state.authError = true;
    });
}