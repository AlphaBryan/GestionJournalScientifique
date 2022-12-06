import { configureStore } from "@reduxjs/toolkit";
import appStateSlice from "./features/appStateSlice";
import adminReducer from './features/adminSlice';
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

export const store = configureStore({
  reducer: {
    appState: appStateSlice,
    admin: adminReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;