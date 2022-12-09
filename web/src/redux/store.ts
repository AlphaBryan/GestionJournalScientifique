import {configureStore} from "@reduxjs/toolkit";
import appStateSlice from "./features/appStateSlice";
import committeeReducer from './features/committee/committee-slice';
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import authReducer from './features/auth/slice';
import categoryReducer from "./features/category/category-slice";
import editionReducer from "./features/edition/edition-slice";
import evaluatorReducer from "./features/evaluator/evaluator-slice";
import authorReducer from "./features/author/author-slice";
import articleReducer from "./features/article/article-slice";


export const store = configureStore({
    reducer: {
        appState: appStateSlice,
        committee: committeeReducer,
        auth: authReducer,
        category: categoryReducer,
        edition: editionReducer,
        evaluator: evaluatorReducer,
        author: authorReducer,
        article: articleReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;