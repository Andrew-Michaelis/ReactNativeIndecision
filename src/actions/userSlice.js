import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: '',
  avatarUrl: '',
  profileUrl: '',
  id: '',
  count: 0,
  lib: [{}],
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
      console.log("START!")
      state.lib = action.payload
      console.log("DONE?")
    },
    sortUserLibrary: (state, action) => {
      console.log(`actshere? ${JSON.stringify(action.payload)}`)
      const sortOrder = action.payload?.order || null
      const sortRegex = (action.payload?.search || "").toLowerCase()
      try{
        console.log("1")
        sortedLib = state.lib
        .filter((obj) => {
          obj === undefined && console.log("BE PURGED")
          return obj !== undefined && (obj.name.toLowerCase().match(sortRegex) !== null);
        })
        .sort((a, b) => {
          switch(sortOrder) {
            case 'alphabetical':
              return ((a.name === b.name) ? 0 : ((a.name < b.name) ? 1 : -1))
            case 'reverseAlphabetical':
              return ((a.name === b.name) ? 0 : ((a.name > b.name) ? 1 : -1))
            case 'playtime':
              return ((a.playtime_forever === b.playtime_forever) ? 0 : ((a.playtime_forever > b.playtime_forever) ? 1 : -1))
            case 'lastplayed':
              return ((a.rtime_last_played === b.rtime_last_played) ? 0 : ((a.rtime_last_played > b.rtime_last_played) ? 1 : -1))
            default:
              return (a.appid - b.appid)
          }
        })
        .map((obj) => {
          return obj
        })
        state.sortLib = sortedLib;
      }catch(e){
        console.log(`ERROR: ${e}`)
      }
    },
    getDisallowList: (state) => {
      return state.disallow
    },
    updateDisallowList: (state, action) => {
      switch(action.payload.type){
        case 'ADD':
          state.disallow.push(action.payload.id)
        case 'REMOVE':
          state.disallow = state.disallow.filter((x) => x !== action.payload.id)
        default:
          return
      }
    }
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
  getDisallowList,
  updateDisallowList,
} = userSlice.actions

export default userSlice.reducer