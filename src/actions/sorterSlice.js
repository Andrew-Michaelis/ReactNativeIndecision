import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  order: "appid",
  search: "",
}

export const sorterSlice = createSlice({
  name: 'sorter',
  initialState,
  reducers: {
    updateOrder: (state, action) => {
      state.order = action.payload;
    },
    updateSearch: (state, action) => {
      state.search = action.payload;
    },
    updateFilterPayload: (state, action) => {
      console.log(`mass update: ${JSON.stringify(action.payload)}`)
      state.order = action.payload.order;
      state.search = action.payload.search;
    }
  },
})

export const { updateOrder, updateSearch, updateFilterPayload } = sorterSlice.actions;

export default sorterSlice.reducer;