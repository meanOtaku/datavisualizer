import { configureStore } from "@reduxjs/toolkit";
import dialogStateReducer from "./slice/appStateSlice";
import compareStateReducer from "./slice/compareDataStateSlice";
import dataStateReducer from "./slice/dataStateSlice";
import cardDataStateReducer from "./slice/appCardStateSlice";
import headerDataStateReducer from "./slice/appHeaderStateSlice";
import graphNameStateReducer from "./slice/graphNameStateSlice";

export default configureStore({
    reducer: {
        dialogState: dialogStateReducer,
        dataState: dataStateReducer,
        cardDataState: cardDataStateReducer,
        headerDataState: headerDataStateReducer,
        graphNameState: graphNameStateReducer,
        compareState: compareStateReducer,
    },
});
