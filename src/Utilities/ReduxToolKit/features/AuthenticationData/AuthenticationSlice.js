import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAuthSettings } from '../../../Services/AuthenticationApi.js';

const initialState = {
  passwordMinLength: '',
  passwordMaxLength: '',
  passwordRequireNonAlphanumeric: '',
  passwordRequireDigit: '',
  passwordRequireUppercase: '',
  passwordRequireLowercase: '',
  phoneNumberCodeLength: 4,
  emailCodeLength: ''
};

export const getAuthSettings = createAsyncThunk(
  'authSettings/getAuthSettings',
  async () => {
    const authSettings = await fetchAuthSettings();
    return authSettings;
  }
);

const authSettingsSlice = createSlice({
  name: 'authSettings',
  initialState,
  reducers: {
    setPasswordMinLength: (state, action) => {
      state.passwordMinLength = action.payload;
    },
    setPasswordMaxLength: (state, action) => {
      state.passwordMaxLength = action.payload;
    },
    setPasswordRequireNonAlphanumeric: (state, action) => {
      state.passwordRequireNonAlphanumeric = action.payload;
    },
    setPasswordRequireDigit: (state, action) => {
      state.passwordRequireDigit = action.payload;
    },
    setPasswordRequireUppercase: (state, action) => {
      state.passwordRequireUppercase = action.payload;
    },
    setPasswordRequireLowercase: (state, action) => {
      state.passwordRequireLowercase = action.payload;
    },
    setPhoneNumberCodeLength: (state, action) => {
      state.phoneNumberCodeLength = action.payload;
    },
    setEmailCodeLength: (state, action) => {
      state.emailCodeLength = action.payload;
    },
    setPassword: (state, action) => {
      state.password1 = action.payload;
    },
    setPassword2: (state, action) => {
      state.password2 = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAuthSettings.fulfilled, (state, action) => {
      const {
        passwordMinLength,
        passwordMaxLength,
        passwordRequireNonAlphanumeric,
        passwordRequireDigit,
        passwordRequireUppercase,
        passwordRequireLowercase,
        phoneNumberCodeLength,
        emailCodeLength,
      } = action.payload;

      state.passwordMinLength = passwordMinLength;
      state.passwordMaxLength = passwordMaxLength;
      state.passwordRequireNonAlphanumeric = passwordRequireNonAlphanumeric;
      state.passwordRequireDigit = passwordRequireDigit;
      state.passwordRequireUppercase = passwordRequireUppercase;
      state.passwordRequireLowercase = passwordRequireLowercase;
      state.phoneNumberCodeLength = phoneNumberCodeLength;
      state.emailCodeLength = emailCodeLength;
    });
  },
});

export const {
  setPasswordMinLength,
  setPasswordMaxLength,
  setPasswordRequireNonAlphanumeric,
  setPasswordRequireDigit,
  setPasswordRequireUppercase,
  setPasswordRequireLowercase,
  setPhoneNumberCodeLength,
  setEmailCodeLength,
  setPassword,
  setPassword2
} = authSettingsSlice.actions;

export default authSettingsSlice.reducer;
export const selectAuthSettings = (store) => store.authSettings;