import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import todosService from './todosService';
import { extractErrorMessage } from '../../utils';

const initialState = {
	todos: null,
};

export const getTodos = createAsyncThunk(
	'todos/getAll',
	async (_, thunkAPI) => {
		try {
			return await todosService.getTodos();
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const todosSlice = createSlice({
	name: 'todos',
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(getTodos.pending, (state) => {
				state.todos = null;
			})
			.addCase(getTodos.fulfilled, (state, action) => {
				state.todos = action.payload;
			});
	},
});

export default todosSlice.reducer;