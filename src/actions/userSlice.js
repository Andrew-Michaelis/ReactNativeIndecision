import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: '',
  avatarUrl: '',
  profileUrl: '',
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
    updateUserAvatar: (state, action) => {
      state.avatarUrl = action.payload
    },
    updateUserProfile: (state, action) => {
      state.profileUrl = action.payload
    },
    updateUserId: (state, action) => {
      state.id = action.payload
    },
    createUserLibrary: (state, action) => {
      state.lib = action.payload
    }, // {} an array? or object? containing saved library info as a string
  },
})

export const { updateUserName, updateUserAvatar, updateUserProfile, updateUserId, createUserLibrary } = userSlice.actions

export default userSlice.reducer