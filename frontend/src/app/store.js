import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice.js';
import ticketReducer from '../features/tickets/ticketSlice.js';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		ticket: ticketReducer
	}
});
