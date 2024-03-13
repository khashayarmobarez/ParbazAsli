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
      toggleDarkMode: (state) => {
        state.isDarkMode = !state.isDarkMode;
      },
      setPassword1: (state, action) => {
        state.password1 = action.payload;
      },
      setPassword2: (state, action) => {
        state.password2 = action.payload;
      },
    },
  });

export const { toggleDarkMode, setPassword1, setPassword2 } = settingsSlice.actions;
export default settingsSlice.reducer;
export const selectSettings = (store) =>store.settings;