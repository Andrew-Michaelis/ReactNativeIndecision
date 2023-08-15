import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: '',
  avatarUrl: '',
  id: '',
  lib: {},
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUserName: (state, action) => {
      state.name = action.payload
    },
    updateUserId: (state, action) => {
      state.id = action.payload
    },
    updateUserAvatar: (state, action) => {
      state.avatarUrl = action.payload
    },
    updateUserLibrary: (state, action) => {
      state.lib = action.payload
    }, // {} an array? or object? containing saved library info as a string
  },
})

export const { updateUserName, updateUserId, updateUserAvatar, updateUserLibrary } = userSlice.actions

export default userSlice.reducer