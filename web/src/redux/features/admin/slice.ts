import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {get, handleHttpErrors, httpDelete, httpJson, post} from "../../httpUtil";
import {Evaluator} from "../../dto/Evaluator";
import {Committee} from "../../dto/Committee";
import {Edition} from "../../dto/Edition";
import {Category} from "../../dto/Category";
import {categoryReducers} from "./category";

type CreateEvaluator = {
    firstName: string, lastName: string, email: string, password: string
}

type CreateCommittee = {
    evaluatorsId: number[];
}

type CreateEdition = {
    name: string;
    submissionLimitDate: number;
}
export const addEvaluator = createAsyncThunk(
    'evaluators/add',
    async (evaluator: CreateEvaluator) => {
        const res = await httpJson(handleHttpErrors(post('/evaluators/', evaluator)));
        return res;
    }
);

export const getEvaluators = createAsyncThunk(
    'evaluators/get',
    async () => {
        const res = await httpJson(handleHttpErrors(get('/evaluators/')));
        return res;
    }
);

export const deleteEvaluators = createAsyncThunk(
    'evaluators/delete',
    async (evaluatorsId: number[]) => {
        for (const evaluatorId of evaluatorsId) {
            await handleHttpErrors(httpDelete(`/evaluators/${evaluatorId}`));
        }
        return evaluatorsId;
    }
);

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
)

export interface AdminSlice {
    evaluators: Evaluator[];
    committees: Committee[];
    editions: Edition[];
    categories: Category[];
}

const initialState: AdminSlice = {
    evaluators: [],
    committees: [],
    editions: [],
    categories: [],
}

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(addEvaluator.fulfilled, (state, action) => {
            state.evaluators.push(action.payload);
        });
        builder.addCase(getEvaluators.fulfilled, (state, action) => {
            state.evaluators = action.payload;
        });
        builder.addCase(deleteEvaluators.fulfilled, (state, action) => {
            state.evaluators = state.evaluators.filter(evaluator => !action.payload.includes(evaluator.id));
        });

        builder.addCase(getCommittees.fulfilled, (state, action) => {
            state.committees = action.payload;
        });
        builder.addCase(addCommittee.fulfilled, (state, action) => {
            state.committees.push(action.payload);
        });

        builder.addCase(getEditions.fulfilled, (state, action) => {
            state.editions = action.payload;
        });
        builder.addCase(addEdition.fulfilled, (state, action) => {
            state.editions.push(action.payload);
        })

        categoryReducers(builder);
    }
});

export const adminActions = adminSlice.actions;

export default adminSlice.reducer;