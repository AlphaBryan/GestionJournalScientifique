import {ActionReducerMapBuilder, createAsyncThunk} from "@reduxjs/toolkit";
import {AuthSlice, LoginRequest} from "./slice";
import {handleHttpErrors, post} from "../../httpUtil";


export const loginEvaluator = createAsyncThunk(
    'evaluators/login',
    async (request: LoginRequest) => {
        const res = await handleHttpErrors(post('/auth/evaluator/login', request, {noAuth: true}));
        return {
            token: res.headers.get('authorization') as string,
            user: await res.json()
        };
    }
);

export const evaluatorReducers = (builder: ActionReducerMapBuilder<AuthSlice>) => {
    builder.addCase(loginEvaluator.fulfilled, (state, action) => {
        state.authError = false;
        state.token = action.payload.token;
        state.authUser = action.payload.user;
        state.role = 'evaluator';
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('authUser', JSON.stringify(action.payload.user));
        localStorage.setItem('role', 'evaluator');
    });
    builder.addCase(loginEvaluator.rejected, (state, action) => {
        state.authError = true;
    });
};