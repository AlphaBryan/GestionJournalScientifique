import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {get, handleHttpErrors, httpJson, post, put} from "../../httpUtil";
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

export type SetArticleCommittee = { articleId: number, committeeId: number };
export type CreateArticle = { title: string, text: File, categoriesId: string[], authorsId: string[], editionId: number };
export const addArticle = createAsyncThunk(
    'articles/add',
    async (article: CreateArticle) => {
        const req = {
            title: article.title,
            authorsId: article.authorsId,
            categoriesId: article.categoriesId,
            editionId: article.editionId
        };
        const data = new FormData()
        data.append('file', article.text);
        const articleRes = await httpJson(handleHttpErrors(post('/articles/', req)));
        const versionRes = await httpJson(handleHttpErrors(post(`/articles/${articleRes.id}/versions`, data, {contentType: 'noJson'})))
        return versionRes;
    }
);

export const addVersion = createAsyncThunk(
    'articles/add-version',
    async (request: { file: File, articleId: number }) => {
        const data = new FormData();
        data.append('file', request.file);
        const versionRes = await httpJson(handleHttpErrors(post(`/articles/${request.articleId}/versions`, data, {contentType: 'noJson'})));
        return versionRes;
    }
)

export const getCurrentAuthorArticles = createAsyncThunk(
    'articles/get-current-author',
    async (_, {getState}) => {
        const state: RootState = getState() as RootState;
        const authUser = state.auth.authUser;
        const res = await httpJson(handleHttpErrors(get(`/articles/author/${authUser.id}/articles`)));
        return res;
    }
);

export const setArticleCommittee = createAsyncThunk(
    'articles/set-committee',
    async (request: SetArticleCommittee) => {
        const res = await httpJson(handleHttpErrors(put(`/committees/${request.committeeId}/articles`, {articleId: request.articleId})));
        return request;
    }
);

export const articleSlice = createSlice({
    name: 'article',
    initialState,
    reducers: {
        cleanCreatedArticle: (state) => {
            state.createdArticle = undefined;
        }
    },
    extraReducers(builder) {
        builder.addCase(addArticle.fulfilled, (state, action) => {
            state.createdArticle = action.payload;
        });
        builder.addCase(getCurrentAuthorArticles.fulfilled, (state, action) => {
            state.authUserArticles = action.payload;
        });
        builder.addCase(setArticleCommittee.fulfilled, (state, action) => {

        });
        builder.addCase(addVersion.fulfilled, (state, action) => {
            const article = state.authUserArticles.find(a => a.id === action.payload.id);
            if (article) {
                article.versions = action.payload.versions;
            }
        })
    }
});

export const articleActions = articleSlice.actions;

export default articleSlice.reducer;