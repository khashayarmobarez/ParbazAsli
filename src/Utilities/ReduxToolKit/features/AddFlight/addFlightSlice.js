import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


// to proccess igc file
export const processAndUpdateIgcFile = createAsyncThunk(
  'addFlight/processAndUpdateIgcFile',
  async (file, thunkAPI) => {
    const serializableFile = {
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified
    };

    // Read file contents
    const text = await file.text();
    
    // Process the text content of the IGC file here
    // For example, you might parse it and extract relevant data
    
    return { 
      fileInfo: serializableFile,
      content: text // or processed content
    };
  }
);


const initialState = {
    activityType:'',

    // the missing equipment info
    hasNecessaryFlightEquipments:'',
    hasNecessaryGroundHandlingEquipments:'',
    flightEquipmentValidationError:'',
    groundHandlingEquipmentValidationError:'',
    invalidFlightEquipmentType: '',
    invalidGroundHandlingEquipmentType: '',


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
    wingType:'',
    courseId:'',
    takeoffTime :'',
    takeoffType :'',
    takeOffWindUnit:{ name: 'km/h', id: 2 },
    takeoffWindSpeed :'',
    takeoffwindDirection :'', 
    landingTime :'',
    landingType: '',
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
    courseName:'',
    groundHandlingCount:'',
  };


  const addFlightSlice = createSlice({
    name: 'addFlight',
    initialState,
    reducers: {
      updateActivityType: (state, action) => {
        state.activityType = action.payload;
      },

      // the lack of equipment section
      updateHasNecessaryFlightEquipment: (state, action) => {
        state.hasNecessaryFlightEquipments = action.payload;
      },
      updateHasNecessaryGroundHandlingEquipments: (state, action) => {
        state.hasNecessaryGroundHandlingEquipments = action.payload;
      },
      updateFlightEquipmentValidationError: (state, action) => {
        state.flightEquipmentValidationError = action.payload;
      },
      updateGroundHandlingEquipmentValidationError: (state, action) => {
        state.groundHandlingEquipmentValidationError = action.payload;
      },
      updateInvalidFlightEquipmentType: (state, action) => {
        state.invalidFlightEquipmentType = action.payload;
      },
      updateInvalidGroundHandlingEquipmentType: (state, action) => {
        state.invalidGroundHandlingEquipmentType = action.payload;
      },

      updateIgcFile: (state, action) => {
        state.igcFile = action.payload;
      },
      updateGroundHandlingCount: (state, action) => {
        state.groundHandlingCount = action.payload;
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
      updateLandingType: (state, action) => {
        state.landingType = action.payload;
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
      updateCourseName: (state, action) => {
        state.courseName = action.payload
      },
      updateDescription: (state, action) => {
        state.description = action.payload
      },
      updateWingType: (state, action) => {
        state.wingType = action.payload
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
        state.landingType = '';
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
  updateIgcFile, updateWing,updateHarness,updateParachute,updateCity, updateCountry,updateClouds,updateFlightType ,updateCourseId ,updateTakeoffTime,updateTakeOfftype,updateTakeoffWindSpeed,updateTakeOffWindDirection ,updateLandingTime, updateTakeOffWindUnit ,updateLandingWindSpeed,updateLandingWindDirection, updateSight, updatePassengerPhoneNumber , updateSyllabi , updatePassengerHarness, updateFlightCount, updateFlightDuration, updateCourseLevel, updateClubName, updateCoachName, updateDescription , resetFlightDataExceptType, updateCourseName, updateWingType, updateLandingType, updateActivityType, updateHasNecessaryGroundHandlingEquipments ,updateHasNecessaryFlightEquipment, updateGroundHandlingEquipmentValidationError, updateFlightEquipmentValidationError, updateInvalidGroundHandlingEquipmentType, updateInvalidFlightEquipmentType, updateGroundHandlingCount
  } = addFlightSlice.actions;

export default addFlightSlice.reducer;
export const selectAddFlight = (store) =>store.addFlight;