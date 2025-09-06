import { createSlice } from "@reduxjs/toolkit";

export const dialogStateSlice = createSlice({
  name: "dialogState",
  initialState: {
    value: false,
  },
  reducers: {
    falseState: (state) => {
      state.value = false;
    },
    trueState: (state) => {
      state.value = true;
    },
    flipState: (state) => {
      state.value = !state.value;
    },
  },
});

// Action creators are generated for each case reducer function
export const { flipState, trueState, falseState } = dialogStateSlice.actions;

export default dialogStateSlice.reducer;
