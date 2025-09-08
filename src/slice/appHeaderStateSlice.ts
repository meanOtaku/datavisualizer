import { createSlice } from "@reduxjs/toolkit";

interface DataState {
    value: any[]; // Replace 'any' with a more specific type if possible
}

const initialState: DataState = {
    value: [],
};

export const appHeaderStateSlice = createSlice({
    name: "HeaderDataState",
    initialState,
    reducers: {
        addHeaderData: (state, action) => {
            state.value.push(action.payload);
        },
        deleteHeaderData: (state, action) => {
            state.value.splice(action.payload, 1);
        },
    },
});

// Action creators are generated for each case reducer function
export const { addHeaderData, deleteHeaderData } = appHeaderStateSlice.actions;

export default appHeaderStateSlice.reducer;
