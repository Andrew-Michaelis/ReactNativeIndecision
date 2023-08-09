import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../actions/userSlice";
import settingReducer from '../actions/settingSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    setting: settingReducer,
  },
})