import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  display: 'dark',
}

export const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    toggleDisplay: (state, action) => {
      state.display = action.payload
    },
  },
})

export const { toggleDisplay } = settingSlice.actions;

export default settingSlice.reducer;