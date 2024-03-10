import { combineReducers } from '@reduxjs/toolkit';
import harnessReducer from './features/Add/harnessSlice';
import userReducer from './features/userData/userSlice';
import addFlightReducer from './features/AddFlight/addFlightSlice';
import settingsReducer from './features/SettingsData/settingsSlice'


const rootReducer = combineReducers({
  harness: harnessReducer,
  user: userReducer,
  addFlight: addFlightReducer,
  settings: settingsReducer
  // Add more reducers as needed
});

export default rootReducer;