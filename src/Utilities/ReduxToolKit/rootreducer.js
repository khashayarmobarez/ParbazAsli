import { combineReducers } from '@reduxjs/toolkit';
import harnessReducer from './features/Add/harnessSlice';
import 

const rootReducer = combineReducers({
  harness: harnessReducer,
  user: userReducer,
  // Add more reducers as needed
});

export default rootReducer;