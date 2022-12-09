import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type appState = {
    appState: string;
    isLoading: boolean;
};

const initialState: appState = {
    appState: "",
    isLoading: false,
};

export const appStateSlice = createSlice({
    name: "appState",
    initialState,
    reducers: {
        setAppState: (state, action: PayloadAction<string>) => {
            state.appState = action.payload;
        },
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        }
    },
});

export const {setAppState} = appStateSlice.actions;

export default appStateSlice.reducer;
