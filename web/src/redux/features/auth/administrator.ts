import {ActionReducerMapBuilder, createAsyncThunk} from "@reduxjs/toolkit";
import {AuthSlice, LoginRequest} from "./slice";
import {handleHttpErrors, post} from "../../httpUtil";


export const loginAdministrator = createAsyncThunk(
    'administrators/login',
    async (request: LoginRequest) => {
        const res = await handleHttpErrors(post('/auth/administrator/login', request, {noAuth: true}));
        console.log('Got response');
        return {
            token: res.headers.get('authorization') as string,
            user: await res.json()
        };
    }
)

export const administratorReducers = (builder: ActionReducerMapBuilder<AuthSlice>) => {
    builder.addCase(loginAdministrator.fulfilled, (state, action) => {
        state.authError = false;
        state.token = action.payload.token;
        state.authUser = action.payload.user;
        state.role = 'administrator';
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('authUser', JSON.stringify(action.payload.user));
        localStorage.setItem('role', 'administrator');
    });
    builder.addCase(loginAdministrator.rejected, (state, action) => {
        state.authError = true;
    });
}