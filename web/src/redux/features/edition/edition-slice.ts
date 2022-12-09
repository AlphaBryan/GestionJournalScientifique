import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {get, handleHttpErrors, httpJson, post} from "../../httpUtil";
import {Edition} from "../../dto/Edition";

type CreateEdition = {
    name: string;
    submissionLimitDate: number;
}

export interface EditionSlice {
    editions: Edition[];
}

const initialState: EditionSlice = {
    editions: [],
};

export const getEditions = createAsyncThunk(
    'editions/get',
    async () => {
        const res = await httpJson(handleHttpErrors(get('/editions/')));
        return res;
    }
);
export const addEdition = createAsyncThunk(
    'editions/add',
    async (edition: CreateEdition) => {
        const res = await httpJson(handleHttpErrors(post('/editions/', edition)));
        return res;
    }
);

export const getEditionArticles = createAsyncThunk(
    'editions/get-articles',
    async (editionId: number) => {
        const res = await httpJson(handleHttpErrors(get(`/articles/edition/${editionId}/articles`)));
        return {editionId, data: res};
    }
)

export const editionSlice = createSlice({
    name: 'edition',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getEditions.fulfilled, (state, action) => {
            state.editions = action.payload;
        });
        builder.addCase(addEdition.fulfilled, (state, action) => {
            state.editions.push(action.payload);
        });
        builder.addCase(getEditionArticles.fulfilled, (state, action) => {
            const edition = state.editions.find(e => e.id === action.payload.editionId);
            if (edition) {
                edition.articles = action.payload.data;
            }
        });
    }
})

export default editionSlice.reducer;