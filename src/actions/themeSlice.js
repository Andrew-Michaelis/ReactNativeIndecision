import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: 'dark',
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      (state.mode === 'dark') ? state.mode='light' : state.mode='dark';
    },
  },
})

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;