import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {get, handleHttpErrors, httpDelete, httpJson, post, put} from "../../httpUtil";
import {Category} from "../../dto/Category";

type CreateCategory = { label: string };
type UpdateCategory = { id: number; label: string };

export interface CategorySlice {
    categories: Category[];
}

const initialState: CategorySlice = {
    categories: []
};

export const getCategories = createAsyncThunk(
    'categories/get',
    async () => {
        const res = await httpJson(handleHttpErrors(get('/categories/')));
        return res;
    }
);

export const addCategory = createAsyncThunk(
    'categories/add',
    async (category: CreateCategory) => {
        const res = await httpJson(handleHttpErrors(post('/categories/', category)));
        return res;
    }
);

export const updateCategory = createAsyncThunk(
    'categories/update',
    async (category: UpdateCategory) => {
        const res = await httpJson(handleHttpErrors(put(`/categories/${category.id}`, {label: category.label})));
        return res;
    }
)

export const deleteCategories = createAsyncThunk(
    'categories/delete',
    async (categoriesId: number[]) => {
        for (const categoryId of categoriesId) {
            await handleHttpErrors(httpDelete(`/categories/${categoryId}`));
        }
        return categoriesId;
    }
);

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {},
    extraReducers(builder) {
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
});

export default categorySlice.reducer;