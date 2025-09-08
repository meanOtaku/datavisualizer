import { createSlice } from "@reduxjs/toolkit";

export const compareStateSlice = createSlice({
    name: "compareState",
    initialState: {
        value: false,
    },
    reducers: {
        falseCompareState: (state) => {
            state.value = false;
        },
        trueCompareState: (state) => {
            state.value = true;
        },
        flipCompareState: (state) => {
            state.value = !state.value;
        },
    },
});

// Action creators are generated for each case reducer function
export const { falseCompareState, trueCompareState, flipCompareState } =
    compareStateSlice.actions;

export default compareStateSlice.reducer;
