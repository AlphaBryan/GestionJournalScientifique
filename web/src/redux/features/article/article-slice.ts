import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get, handleHttpErrors, httpJson, post, put } from "../../httpUtil";
import { Article } from "../../dto/Article";
import { RootState } from "../../store";

export interface ArticleSlice {
  createdArticle?: Article;
  selectedArticle?: Article;
  authUserArticles: Article[];
  committeeArticles: any;
}

const initialState: ArticleSlice = {
  createdArticle: undefined,
  selectedArticle: undefined,
  authUserArticles: [],
  committeeArticles: [],
};

export type SetArticleCommittee = { articleId: number; committeeId: number };
export type CreateArticle = {
  title: string;
  text: File;
  categoriesId: string[];
  authorsId: string[];
  editionId: number;
};
export type EvaluatedArticle = {
  articleId: string;
  versionId: number;
  comment: string;
  isCommentMajor: boolean;
  rate: number;
};
export const addArticle = createAsyncThunk(
  "articles/add",
  async (article: CreateArticle) => {
    const req = {
      title: article.title,
      authorsId: article.authorsId,
      categoriesId: article.categoriesId,
      editionId: article.editionId,
    };
    const data = new FormData();
    data.append("file", article.text);
    const articleRes = await httpJson(
      handleHttpErrors(post("/articles/", req))
    );
    const versionRes = await httpJson(
      handleHttpErrors(
        post(`/articles/${articleRes.id}/versions`, data, {
          contentType: "noJson",
        })
      )
    );
    return versionRes;
  }
);

export const getCurrentAuthorArticles = createAsyncThunk(
  "articles/get-current-author",
  async (_, { getState }) => {
    const state: RootState = getState() as RootState;
    const authUser = state.auth.authUser;
    const res = await httpJson(
      handleHttpErrors(get(`/articles/author/${authUser.id}/articles`))
    );
    return res;
  }
);

export const setArticleCommittee = createAsyncThunk(
  "articles/set-committee",
  async (request: SetArticleCommittee) => {
    const res = await httpJson(
      handleHttpErrors(
        put(`/committees/${request.committeeId}/articles`, {
          articleId: request.articleId,
        })
      )
    );
    return request;
  }
);

export const getCommitteeArticles = createAsyncThunk(
  "committees/get-committee-article",
  async (committeeId: number) => {
    const res = await httpJson(
      handleHttpErrors(get(`/articles/committee/${committeeId}/articles`))
    );
    return res;
  }
);

export const evaluateArticle = createAsyncThunk(
  "articles/evalutate",
  async (evalutation: EvaluatedArticle) => {
    const req = {
      comment: evalutation.comment,
      isCommentMajor: evalutation.isCommentMajor,
      rate: evalutation.rate,
    };
    console.log("evalutation:", evalutation);

    const evalutateArticleRes = await httpJson(
      handleHttpErrors(
        post(
          `/articles/${evalutation.articleId}/${evalutation.versionId}/evaluate`,
          req
        )
      )
    );
    return evalutateArticleRes;
  }
);

export const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    cleanCreatedArticle: (state) => {
      state.createdArticle = undefined;
    },
  },
  extraReducers(builder) {
    builder.addCase(addArticle.fulfilled, (state, action) => {
      state.createdArticle = action.payload;
    });
    builder.addCase(getCurrentAuthorArticles.fulfilled, (state, action) => {
      state.authUserArticles = action.payload;
    });
    builder.addCase(getCommitteeArticles.fulfilled, (state, action) => {
      state.committeeArticles = action.payload;
    });
    builder.addCase(setArticleCommittee.fulfilled, (state, action) => {});
  },
});

export const articleActions = articleSlice.actions;

export default articleSlice.reducer;
