import {Author} from "../../dto/Author";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {get, handleHttpErrors, httpJson} from "../../httpUtil";


export interface AuthorSlice {
    authors: Author[];
}

const initialState: AuthorSlice = {
    authors: []
};

export const getAuthors = createAsyncThunk(
    'authors/get',
    async () => {
        const res = await httpJson(handleHttpErrors(get('/authors/')));
        return res;
    }
);

export const authorSlice = createSlice({
    name: 'author',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getAuthors.fulfilled, (state, action) => {
            state.authors = action.payload;
        });
    }
});

export default authorSlice.reducer;