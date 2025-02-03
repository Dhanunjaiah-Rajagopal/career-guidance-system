import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";

// Define the RootState type based on the store's reducers
export type RootState = ReturnType<typeof store.getState>;

// Define the AppDispatch type for typed dispatch usage
export type AppDispatch = typeof store.dispatch;

const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});

export default store;
