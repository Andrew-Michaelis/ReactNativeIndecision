import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import userReducer from "../actions/userSlice";
import settingReducer from '../actions/settingSlice';
import themeReducer from "../actions/themeSlice";
import sorterReducer from "../actions/sorterSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    setting: settingReducer,
    theme: themeReducer,
    sorter: sorterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: false,
      actionCreatorCheck: false,
      immutableCheck: false,
    })
})