import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {get, handleHttpErrors, httpJson, post} from "../../httpUtil";
import {Committee} from "../../dto/Committee";

type CreateCommittee = {
    evaluatorsId: number[];
}

export interface CommitteeSlice {
    committees: Committee[];
}

const initialState: CommitteeSlice = {
    committees: [],
}

export const getCommittees = createAsyncThunk(
    'committees/get',
    async () => {
        const res = await httpJson(handleHttpErrors(get('/committees/')));
        return res;
    }
);

export const addCommittee = createAsyncThunk(
    'committees/add',
    async (committee: CreateCommittee) => {
        const res = await httpJson(handleHttpErrors(post('/committees/', committee)));
        return res;
    }
);


export const committeeSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getCommittees.fulfilled, (state, action) => {
            state.committees = action.payload;
        });
        builder.addCase(addCommittee.fulfilled, (state, action) => {
            state.committees.push(action.payload);
        });
    }
});

export default committeeSlice.reducer;