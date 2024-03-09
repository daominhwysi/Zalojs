import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import previousNameReducer, { setPreviousName } from './previousNameSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    previousName : previousNameReducer,
  }
});
