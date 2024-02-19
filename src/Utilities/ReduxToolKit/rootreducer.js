import { combineReducers } from '@reduxjs/toolkit';
import harnessReducer from './features/harnessSlice';

const rootReducer = combineReducers({
  harness: harnessReducer,
  // Add more reducers as needed
});

export default rootReducer;