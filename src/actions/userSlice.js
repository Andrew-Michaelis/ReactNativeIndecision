import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: '',
  lib: {},
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUsername: (state, action) => {
      state.name = action.payload
    },
    updateUserlibrary: (state, action) => {
      state.lib = action.payload
    }, // {} an array? or object? containing saved library info as a string
  },
})

export const { updateUsername, updateUserlibrary } = userSlice.actions

export default userSlice.reducer