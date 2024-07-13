import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './features/userData/userSlice';
import addFlightReducer from './features/AddFlight/addFlightSlice';
import settingsReducer from './features/SettingsData/settingsSlice'
import authSettingsReducer from './features/AuthenticationData/AuthenticationSlice'
import flightFilterSlice from './features/flightHistoryAdvancedFilter/flightFilterSlice';


const rootReducer = combineReducers({
  user: userReducer,
  addFlight: addFlightReducer,
  settings: settingsReducer,
  authSettings: authSettingsReducer,
  flightFilter: flightFilterSlice
});

export default rootReducer;