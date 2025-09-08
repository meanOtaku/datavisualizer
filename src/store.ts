import { configureStore } from "@reduxjs/toolkit";
import dialogStateReducer from "./slice/appStateSlice";
import dataStateReducer from "./slice/dataStateSlice";
import cardDataStateReducer from "./slice/appCardStateSlice";
import headerDataStateReducer from "./slice/appHeaderStateSlice";

export default configureStore({
    reducer: {
        dialogState: dialogStateReducer,
        dataState: dataStateReducer,
        cardDataState: cardDataStateReducer,
        headerDataState: headerDataStateReducer,
    },
});
