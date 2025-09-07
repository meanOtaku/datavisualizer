import { createSlice } from "@reduxjs/toolkit";

export interface CardDataObject {
    deleteGraphData: boolean;
    graphType: "Grouped" | "Seperated";
    showTgF: boolean;
    showgFx: boolean;
    showgFy: boolean;
    showgFz: boolean;
}

interface CardDataState {
    value: CardDataObject[]; // Replace 'any' with a more specific type if possible
}

const initialState: CardDataState = {
    value: [],
};

export const appCardStateSlice = createSlice({
    name: "cardDataState",
    initialState,
    reducers: {
        addCardData: (state, action) => {
            state.value.push(action.payload);
        },
        updateCardData: (state, action) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            state.value[action.payload.index] &&
                (state.value[action.payload.index] = action.payload.value);
        },
        deleteCardData: (state, action) => {
            state.value.splice(action.payload, 1);
        },
    },
});

// Action creators are generated for each case reducer function
export const { addCardData, updateCardData, deleteCardData } =
    appCardStateSlice.actions;

export default appCardStateSlice.reducer;
