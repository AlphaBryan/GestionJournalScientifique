import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {get, handleHttpErrors, httpJson, post} from "../../httpUtil";
import {Article} from "../../dto/Article";
import {RootState} from "../../store";


export interface ArticleSlice {
    createdArticle?: Article;
    selectedArticle?: Article;
    authUserArticles: Article[];
}

const initialState: ArticleSlice = {
    createdArticle: undefined,
    selectedArticle: undefined,
    authUserArticles: [],
};

export type CreateArticle = { title: string, text: string, categoriesId: string[], authorsId: string[], editionId: number };
export const addArticle = createAsyncThunk(
    'articles/add',
    async (article: CreateArticle) => {
        const res = await httpJson(handleHttpErrors(post('/articles/', article)));
        return res;
    }
);

export const getCurrentAuthorArticles = createAsyncThunk(
    'articles/get-current-author',
    async (_, {getState}) => {
        const state: RootState = getState() as RootState;
        const authUser = state.auth.authUser;
        const res = await httpJson(handleHttpErrors(get(`/articles/author/${authUser.id}/articles`)));
        return res;
    }
)

export const articleSlice = createSlice({
    name: 'article',
    initialState,
    reducers: {
        setSelectedArticle: (state, action) => {
            state.selectedArticle = action.payload;
        }
    },
    extraReducers(builder) {
        builder.addCase(addArticle.fulfilled, (state, action) => {
            state.createdArticle = action.payload;
        });
        builder.addCase(getCurrentAuthorArticles.fulfilled, (state, action) => {
            state.authUserArticles = action.payload;
        });
    }
});

export const articleActions = articleSlice.actions;

export default articleSlice.reducer;