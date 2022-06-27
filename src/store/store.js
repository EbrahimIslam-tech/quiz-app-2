import { configureStore } from "@reduxjs/toolkit";
import QusReducer from "./../features/qusSlice";

export const store = configureStore({
  reducer: { qusAns: QusReducer },

  devTools: process.env.NODE_ENV !== "production",
});
