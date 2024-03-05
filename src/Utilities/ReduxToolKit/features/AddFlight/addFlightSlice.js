import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    igcFile:null,
    wing:'',
    harness: '',
    parachute :'',
    city:'',
    clouds:'',
    // flight type sets the last page of the coach
    flightType:'',
    takeoffTime :'',
    takeoffType :'',
    takeoffWindSpeed :'',
    takeoffwindDirection :'', 
    landingTime :'',
    landingWindSpeed :'',
    landingWindDirection :'', 
  };


  const addFlightSlice = createSlice({
    name: 'addFlight',
    initialState,
    reducers: {
      updateIgcFile: (state, action) => {
        state.igcFile = action.payload;
      },
      updateWing: (state, action) => {
        state.wing = action.payload;
      },
      updateHarness: (state, action) => {
        state.harness = action.payload;
      },
      updateParachute: (state, action) => {
        state.parachute = action.payload;
      },
      updateCity: (state, action) => {
        state.city = action.payload;
      },
      updateClouds: (state, action) => {
        state.clouds = action.payload;
      },
      updateFlightType: (state, action) => {
        state.flightType = action.payload;
      },
      updateTakeoffTime: (state, action) => {
        state.takeoffTime = action.payload;
      },
      updateTakeoffWindSpeed: (state, action) => {
        state.takeoffWindSpeed = action.payload;
      },
      updateTakeOffWindDirection: (state, action) => {
        state.takeoffwindDirection = action.payload;
      },
      updateTakeOfftype: (state, action) => {
        state.takeoffType = action.payload;
      },
      updateLandingTime: (state, action) => {
        state.landingTime = action.payload;
      },
      updateLandingWindSpeed: (state, action) => {
        state.landingWindSpeed = action.payload;
      },
      updateLandingWindDirection: (state, action) => {
        state.landingWindDirection = action.payload;
      },
    },
  });


export const { updateIgcFile, updateWing,updateHarness,updateParachute,updateCity,updateClouds,updateFlightType,updateTakeoffTime,updateTakeOfftype,updateTakeoffWindSpeed,takeoffwindDirection,landingTime,landingWindSpeed,landingWindDirection } = addFlightSlice.actions;
export default addFlightSlice.reducer;
export const selectAddFlight = (store) =>store.addFlight;