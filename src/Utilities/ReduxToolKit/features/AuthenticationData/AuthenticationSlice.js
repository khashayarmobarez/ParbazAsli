import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAuthSettings } from '../../../Services/AuthenticationApi.js';

const initialState = {
    loading: false,
    error: null,
    settings:{
        passwordMinLength: '',
        passwordMaxLength: '',
        passwordRequireNonAlphanumeric: '',
        passwordRequireDigit: '',
        passwordRequireUppercase: '',
        passwordRequireLowercase: '',   
        phoneNumberCodeLength: 4,
        emailCodeLength: 6
    }
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
    builder.addCase(getAuthSettings.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAuthSettings.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
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
      state.settings = {
        passwordMinLength,
        passwordMaxLength,
        passwordRequireNonAlphanumeric,
        passwordRequireDigit,
        passwordRequireUppercase,
        passwordRequireLowercase,
        phoneNumberCodeLength,
        emailCodeLength,
      };
    });
    builder.addCase(getAuthSettings.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
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