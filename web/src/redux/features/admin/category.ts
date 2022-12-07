import {ActionReducerMapBuilder, createAsyncThunk} from "@reduxjs/toolkit";
import {get, httpDelete, post, put} from "../../httpUtil";
import {AdminSlice} from "./slice";

type CreateCategory = { label: string };
type UpdateCategory = { id: number; label: string };

export const getCategories = createAsyncThunk(
    'categories/get',
    async () => {
        const res = await get('/categories/');
        return res;
    }
);

export const addCategory = createAsyncThunk(
    'categories/add',
    async (category: CreateCategory) => {
        const res = await post('/categories/', category);
        return res;
    }
);

export const updateCategory = createAsyncThunk(
    'categories/update',
    async (category: UpdateCategory) => {
        const res = await put(`/categories/${category.id}`, {label: category.label});
        return res;
    }
)

export const deleteCategories = createAsyncThunk(
    'categories/delete',
    async (categoriesId: number[]) => {
        for (const categoryId of categoriesId) {
            await httpDelete(`/categories/${categoryId}`);
        }
        return categoriesId;
    }
);

export const categoryReducers = (builder: ActionReducerMapBuilder<AdminSlice>) => {
    builder.addCase(getCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
    });
    builder.addCase(addCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
    });
    builder.addCase(updateCategory.fulfilled, (state, action) => {
        const category = state.categories.find(category => category.id === action.payload.id);
        if (category) {
            category.label = action.payload.label;
        }
    });
    builder.addCase(deleteCategories.fulfilled, (state, action) => {
        state.categories = state.categories.filter(category => !action.payload.includes(category.id));
    });
}