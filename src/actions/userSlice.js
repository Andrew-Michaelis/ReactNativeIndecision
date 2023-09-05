import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: '',
  avatarUrl: '',
  profileUrl: '',
  id: '',
  count: 0,
  libIndex: [],
  lib: [{}],
  disallow: [],
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
    createUserLibrary: (state, action) => {
      let gameIndexById = []
      const gameLib = action.payload.map((gameObj) => {
        gameIndexById.push(gameObj.appid)
        return gameObj
      })
      state.lib = gameLib
      state.libIndex = gameIndexById
    },
    updateGameDisallow: (state, action) => {
      const libIndex = action.payload.libIndex
      console.log(`disIndex: ${JSON.stringify(libIndex)} ||`)
      state.lib[libIndex].allow = !state.lib[libIndex].allow
    },
  },
})

export const { 
  updateUserName, 
  updateUserAvatar, 
  updateUserProfile, 
  updateUserId, 
  updateUserGameCount, 
  createUserLibrary, 
  sortUserLibrary,
  updateGameDisallow,
} = userSlice.actions

export default userSlice.reducer