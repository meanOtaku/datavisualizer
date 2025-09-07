import { configureStore } from "@reduxjs/toolkit";
import dialogStateReducer from "./slice/appStateSlice";
import dataStateReducer from "./slice/dataStateSlice";
import cardDataStateReducer from "./slice/appCardStateSlice";

export default configureStore({
    reducer: {
        dialogState: dialogStateReducer,
        dataState: dataStateReducer,
        cardDataState: cardDataStateReducer,
    },
});
