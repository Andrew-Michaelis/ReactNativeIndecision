import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: '',
  avatarUrl: '',
  profileUrl: '',
  id: '',
  lib: {},
  sortedLib: [{
    appid: 0,
    name: '',
    playtime_forever: '',
    rtime_last_played: 0,
  }],
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
    },
    sortUserLibrary: (state, action) => {
      state.sortedLib = action.payload
    }
  },
})

export const { updateUserName, updateUserAvatar, updateUserProfile, updateUserId, createUserLibrary, sortUserLibrary } = userSlice.actions

export default userSlice.reducer