import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import appReducer from "./app-reducer";

export default configureStore({
  reducer: {
    app: appReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
