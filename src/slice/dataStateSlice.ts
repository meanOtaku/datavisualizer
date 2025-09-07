import { createSlice } from "@reduxjs/toolkit";

interface DataState {
    value: any[]; // Replace 'any' with a more specific type if possible
}

const initialState: DataState = {
    value: [],
};

export const dataStateSlice = createSlice({
    name: "dataState",
    initialState,
    reducers: {
        updateData: (state, action) => {
            state.value.push(action.payload);
        },
        deleteData: (state, action) => {
            state.value.splice(action.payload, 1);
        },
    },
});

// Action creators are generated for each case reducer function
export const { updateData, deleteData } = dataStateSlice.actions;

export default dataStateSlice.reducer;
