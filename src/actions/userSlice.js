import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: '',
  avatarUrl: '',
  profileUrl: '',
  id: '',
  count: 0,
  lib: [{}],
  sortedLib: [{}],
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
    updateUserGameCount: (state, action) => {
      state.count = action.payload
    },
    toggleWhite: (state, action) => {
      const index = state.sortedLib[action.payload]
      console.log(`pre: ${index.name} || white: ${index.white}`)
      index.white ? index.white = false : index.white = true 
      console.log(`post: ${index.name} || white: ${index.white}`)
    },
    createUserLibrary: (state, action) => {
      state.lib = action.payload
    },
    sortUserLibrary: (state, action) => {
      state.sortedLib = action.payload
    }
  },
})

export const { updateUserName, updateUserAvatar, updateUserProfile, updateUserId, updateUserGameCount, createUserLibrary, sortUserLibrary } = userSlice.actions

export default userSlice.reducer