import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {get, handleHttpErrors, httpDelete, httpJson, post} from "../../httpUtil";
import {Evaluator} from "../../dto/Evaluator";

type CreateEvaluator = {
    firstName: string, lastName: string, email: string, password: string
}

export interface EvaluatorSlice {
    evaluators: Evaluator[];
}

const initialState: EvaluatorSlice = {
    evaluators: [],
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

export const evaluatorSlice = createSlice({
    name: 'evaluator',
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
    }
});

export default evaluatorSlice.reducer;