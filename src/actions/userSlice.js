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
      state.lib = action.payload
    },
    sortUserLibrary: (state, action) => {
      console.log(`actshere? ${JSON.stringify(action.payload)}`)
      const sortOrder = action.payload?.order || null
      const sortRegex = (action.payload?.search || "").toLowerCase()
      try{
        console.log("1")
        sortedLib = state.lib
        .filter((obj) => {
          return obj !== undefined && obj.name.toLowerCase().match(sortRegex) !== null && !state.disallow.includes(obj.appid);
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
    updateDisallowList: (state, action) => {
      const TYPE = action.payload.type;
      const id = action.payload.id;
      const disallow = state.disallow;

      switch(TYPE){
        case 'ADD':
          disallow.push(id)
          break;
        case 'REMOVE':
          i = disallow.indexOf(id)
          disallow.splice(i, 1)
          break;
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
  updateDisallowList,
} = userSlice.actions

export default userSlice.reducer