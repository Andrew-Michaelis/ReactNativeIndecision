import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: '',
  avatarUrl: '',
  profileUrl: '',
  id: '',
  count: 0,
  libIndex: [],
  lib: [{}],
  sortLibIndex: [],
  sortLib: [{}],
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
      const sortIndex = action.payload.sortIndex
      console.log(`disIndex: ${JSON.stringify(libIndex)} || ${JSON.stringify(sortIndex)}`)
      state.lib[libIndex].allow = !state.lib[libIndex].allow
      state.sortLib[sortIndex].allow = !state.sortLib[sortIndex].allow
    },
    sortUserLibrary: (state, action) => {
      console.log(`actshere? ${JSON.stringify(action.payload)}`)
      const sortOrder = action.payload?.order || null
      const sortRegex = (action.payload?.search || "").toLowerCase()
      try{
        let sortOperations = 0
        sortedLibIndex = []
        sortedLib = state.lib
        .filter((gameObj) => {
          return gameObj !== undefined && gameObj.name.toLowerCase().match(sortRegex) !== null;
        })
        .sort((a, b) => {
          sortOperations++
          switch(sortOrder) {
            case 'alphabetical':
              return ((a.name === b.name) ? 0 : ((a.name > b.name) ? 1 : -1))
            case 'reverseAlphabetical':
              return ((a.name === b.name) ? 0 : ((a.name < b.name) ? 1 : -1))
            case 'playtime':
              aTime = parseInt(a.playtime_forever);
              bTime = parseInt(b.playtime_forever);
              return ((aTime === bTime) ? 0 : ((aTime < bTime) ? 1 : -1))
            case 'lastplayed':
              return ((a.rtime_last_played === b.rtime_last_played) ? 0 : ((a.rtime_last_played > b.rtime_last_played) ? 1 : -1))
            case 'firstplayed':
              return ((a.rtime_last_played === b.rtime_last_played) ? 0 : ((a.rtime_last_played < b.rtime_last_played) ? 1 : -1))
            default:
              return (a.appid - b.appid)
          }
        })
        .map((gameObj) => {
          sortedLibIndex.push(gameObj.appid)
          return gameObj
        })
        state.sortLib = sortedLib;
        state.sortLibIndex = sortedLibIndex
        console.log(`sort operations: ${sortOperations}`)
      }catch(e){
        console.log(`ERROR: ${e}`)
      }
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