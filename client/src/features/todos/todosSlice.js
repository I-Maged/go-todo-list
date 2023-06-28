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

export const addTodo = createAsyncThunk(
	'todos/addTodo',
	async (todoData, thunkAPI) => {
		try {
			return await todosService.addTodo(todoData);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const deleteTodo = createAsyncThunk(
	'todos/delete',
	async (todoID, thunkAPI) => {
		try {
			return await todosService.deleteTodo(todoID);
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
			})
			.addCase(addTodo.fulfilled, (state, action) => {
				state.todos = [...state.todos, action.payload];
			})
			.addCase(deleteTodo.fulfilled, (state, action) => {
				state.todos = state.todos.filter((todo) => todo._id !== action.payload);
			});
	},
});

export default todosSlice.reducer;
