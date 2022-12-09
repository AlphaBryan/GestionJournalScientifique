import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {handleHttpErrors, httpJson, post} from "../../httpUtil";
import {Article} from "../../dto/Article";


export interface ArticleSlice {
    createdArticle?: Article;
}

const initialState: ArticleSlice = {
    createdArticle: undefined,
};

export type CreateArticle = { title: string, text: string, categoriesId: string[], authorsId: string[] };
export const addArticle = createAsyncThunk(
    'articles/add',
    async (article: CreateArticle) => {
        const res = await httpJson(handleHttpErrors(post('/articles/', article)));
        console.log(res);
        return res;
    }
)

export const articleSlice = createSlice({
    name: 'article',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(addArticle.fulfilled, (state, action) => {
            state.createdArticle = action.payload;
        });
    }
});

export default articleSlice.reducer;