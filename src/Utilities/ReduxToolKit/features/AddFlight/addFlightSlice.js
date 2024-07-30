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
    takeOffWindUnit:{ name: 'km/h', id: 2 },
    takeoffWindSpeed :'',
    takeoffwindDirection :'', 
    landingTime :'',
    landingWindSpeed :'',
    landingWindDirection :'', 
    // passenger phone number for tandem flights
    passengerPhoneNumber:'',
    description:'',
    // syllabi for only sollo flights
    syllabi:[],

    // based data to show to the user in add flight upper box
    flightCount:'',
    flightDuration:'',
    courseLevel:'',
    clubName:'',
    coachName:'',
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
      updateFlightCount: (state, action) => {
        state.flightCount = action.payload;
      },
      updateFlightDuration: (state, action) => {
        state.flightDuration = action.payload;
      },
      updateCourseLevel: (state, action) => {
        state.courseLevel = action.payload;
      },
      updateClubName: (state, action) => {
        state.clubName = action.payload;
      },
      updateCoachName: (state, action) => {
        state.coachName = action.payload
      },
      updateDescription: (state, action) => {
        state.description = action.payload
      },
      resetFlightDataExceptType(state) {
        state.courseId = '';
        state.flightCount = 0;
        state.courseLevel = '';
        state.clubName = '';
        state.coachName = '';
        state.description = '';
        state.takeoffTime = '';
        state.takeoffType = '';
        state.takeoffWindSpeed = '';
        state.takeoffwindDirection = '';
        state.landingTime = '';
        state.landingWindSpeed = '';
        state.landingWindDirection = '';
        state.passengerPhoneNumber = '';
        state.passengerHarness = '';
        state.parachute = '';
        state.harness = '';
        state.wing = '';
        state.syllabi = [];
        
      },
    },
  });


export const {
  updateIgcFile, updateWing,updateHarness,updateParachute,updateCity, updateCountry,updateClouds,updateFlightType ,updateCourseId ,updateTakeoffTime,updateTakeOfftype,updateTakeoffWindSpeed,updateTakeOffWindDirection ,updateLandingTime, updateTakeOffWindUnit ,updateLandingWindSpeed,updateLandingWindDirection, updateSight, updatePassengerPhoneNumber , updateSyllabi , updatePassengerHarness, updateFlightCount, updateFlightDuration, updateCourseLevel, updateClubName, updateCoachName, updateDescription , resetFlightDataExceptType
  } = addFlightSlice.actions;

export default addFlightSlice.reducer;
export const selectAddFlight = (store) =>store.addFlight;