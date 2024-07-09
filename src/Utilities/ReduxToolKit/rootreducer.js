import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './features/userData/userSlice';
import addFlightReducer from './features/AddFlight/addFlightSlice';
import settingsReducer from './features/SettingsData/settingsSlice'
import authSettingsReducer from './features/AuthenticationData/AuthenticationSlice'


const rootReducer = combineReducers({
  user: userReducer,
  addFlight: addFlightReducer,
  settings: settingsReducer,
  authSettings: authSettingsReducer
  // Add more reducers as needed
});

export default rootReducer;