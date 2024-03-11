import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducer";

const store = configureStore({ reducer: rootReducer });

export const dispatch = store.dispatch;
export const getRootState = () => store.getState(); // Return a function to access the current state

export { store };