import { configureStore } from "@reduxjs/toolkit";
import dialogStateReducer from "./slice/appStateSlice";

export default configureStore({
  reducer: {
    dialogState: dialogStateReducer,
  },
});
