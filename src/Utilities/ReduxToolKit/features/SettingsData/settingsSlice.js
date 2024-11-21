import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isDarkMode: true,
    password1:'',
    password2:''
  };

  const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
      setDarkMode: (state, action) => {
        state.isDarkMode = action.payload;
      },
      setPassword1: (state, action) => {
        state.password1 = action.payload;
      },
      setPassword2: (state, action) => {
        state.password2 = action.payload;
      },
    },
  });

export const { setDarkMode, setPassword1, setPassword2 } = settingsSlice.actions;
export default settingsSlice.reducer;
export const selectSettings = (store) =>store.settings;