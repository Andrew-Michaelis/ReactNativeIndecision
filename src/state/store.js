import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import userReducer from "../actions/userSlice";
import themeReducer from "../actions/themeSlice";
import sorterReducer from "../actions/sorterSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
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