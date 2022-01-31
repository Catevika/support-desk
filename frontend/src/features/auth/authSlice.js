import { createSlice, createAsyncThunck } from '@reduxjs/toolkit';

const initialState = {
	user: null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: ''
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducer: {},
	extraReducers: (builder) => {}
});

export default authSlice.reducer;
