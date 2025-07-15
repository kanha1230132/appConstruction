import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    DailyDairyReports : {}
};

export const ReportSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    updateDailyDairyReports: (state, action) => {
      console.log("updateDailyDairyReports : ", action.payload);
      state.DailyDairyReports = action.payload;
  
    },
     rehydrate: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateDailyDairyReports,rehydrate } = ReportSlice.actions;

export default ReportSlice.reducer;