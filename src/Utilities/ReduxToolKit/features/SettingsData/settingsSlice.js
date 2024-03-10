import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    brand: '',
  };

  const settingsSlice = createSlice({
    name: 'harness',
    initialState,
    reducers: {
      updateBrand: (state, action) => {
        state.brand = action.payload;
      },
    },
  });

export const { updateBrand } = settingsSlice.actions;
export default settingsSlice.reducer;
export const selectSettings = (store) =>store.settings;