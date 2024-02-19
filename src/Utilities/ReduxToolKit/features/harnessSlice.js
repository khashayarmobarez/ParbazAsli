import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    brand: '',
    aircraft: '',
    size: '',
    flightHour: '',
    wingCode: '',
    selectedFile: null,
  };

  const harnessSlice = createSlice({
    name: 'harness',
    initialState,
    reducers: {
      updateBrand: (state, action) => {
        state.brand = action.payload;
      },
      updateSize: (state, action) => {
        state.size = action.payload;
      },
      updateHour: (state, action) => {
        state.hour = action.payload;
      },
      updateAircraft: (state, action) => {
        state.aircraft = action.payload;
      },
      updateWingcode: (state, action) => {
        state.wingcode = action.payload;
      },
      // Add more reducers for other fields
      updateSelectedFile: (state, action) => {
        state.selectedFile = action.payload;
      },
    },
  });

export const { updateBrand, updateSize, updateHour, updateAircraft, updateWingcode, updateSelectedFile } = harnessSlice.actions;
export default harnessSlice.reducer;
export const selectHarness = (store) =>store.harness;