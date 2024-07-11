import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    igcFile:null,
    wing:'',
    harness: '',
    passengerHarness: '',
    parachute :'',
    country:'',
    city:'',
    // site
    sight:'',
    // cloud cover type id 
    clouds:'',
    flightType:'',
    courseId:'',
    takeoffTime :'',
    takeoffType :'',
    takeOffWindUnit:'',
    takeoffWindSpeed :'',
    takeoffwindDirection :'', 
    landingTime :'',
    landingWindSpeed :'',
    landingWindDirection :'', 
    // passenger phone number for tandem flights
    passengerPhoneNumber:'',
    // syllabi for only sollo flights
    syllabi:[],
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
      updateCountry: (state, action) => {
        state.country = action.payload;
      },
      updateSight: (state, action) => {
        state.sight = action.payload;
      },
      updateClouds: (state, action) => {
        state.clouds = action.payload;
      },
      updateFlightType: (state, action) => {
        state.flightType = action.payload;
      },
      updateCourseId: (state, action) => {
        state.courseId = action.payload;
      },
      updateTakeoffTime: (state, action) => {
        state.takeoffTime = action.payload;
      },
      updateTakeOffWindUnit: (state, action) => {
        state.takeOffWindUnit = action.payload;
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
      updatePassengerPhoneNumber: (state, action) => {
        state.passengerPhoneNumber = action.payload;
      },
      updatePassengerHarness: (state, action) => {
        state.passengerHarness = action.payload;
      },
      updateSyllabi: (state, action) => {
        state.syllabi = action.payload;
      },
    },
  });


export const {
  updateIgcFile, updateWing,updateHarness,updateParachute,updateCity, updateCountry,updateClouds,updateFlightType ,updateCourseId ,updateTakeoffTime,updateTakeOfftype,updateTakeoffWindSpeed,updateTakeOffWindDirection ,updateLandingTime, updateTakeOffWindUnit ,updateLandingWindSpeed,updateLandingWindDirection, updateSight, updatePassengerPhoneNumber , updateSyllabi , updatePassengerHarness
  } = addFlightSlice.actions;

export default addFlightSlice.reducer;
export const selectAddFlight = (store) =>store.addFlight;