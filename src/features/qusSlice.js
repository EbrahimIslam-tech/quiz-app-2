import { createSlice } from "@reduxjs/toolkit";
import data from "../Components/ModelTest/DemoData";
const qusSlice = createSlice({
  name: "auth",
  initialState: {
    qusData: [],
    data: data,
    selectAns: [],
  },

  reducers: {
    saveQusAns: (state, action) => {
      state.qusData.push({
        qsn: action.payload.qsn,
        selectAns: action.payload.ans,
      });

      localStorage.setItem("QusAns", JSON.stringify(state.qusData));
    },
  },
});
export const { saveQusAns, saveSelectedAns } = qusSlice.actions;
export default qusSlice.reducer;
