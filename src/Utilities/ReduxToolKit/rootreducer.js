import { combineReducers } from '@reduxjs/toolkit';
import harnessReducer from './features/Add/harnessSlice';
import userReducer from './features/userData/userSlice';
import addFlightReducer from './features/AddFlight/addFlightSlice';


const rootReducer = combineReducers({
  harness: harnessReducer,
  user: userReducer,
  addFlight: addFlightReducer,
  // Add more reducers as needed
});

export default rootReducer;