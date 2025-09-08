import { createSlice } from "@reduxjs/toolkit";

interface DataState {
    value: any[]; // Replace 'any' with a more specific type if possible
}

const initialState: DataState = {
    value: [],
};

export const graphNameStateSlice = createSlice({
    name: "graphNameState",
    initialState,
    reducers: {
        addGraphNameData: (state, action) => {
            state.value.push(action.payload);
        },
        deleteGraphNameData: (state, action) => {
            state.value.splice(action.payload, 1);
        },
    },
});

// Action creators are generated for each case reducer function
export const { addGraphNameData, deleteGraphNameData } =
    graphNameStateSlice.actions;

export default graphNameStateSlice.reducer;
