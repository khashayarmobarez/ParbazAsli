import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  // user role could be  coach or organization or null
    userRole:'coach',
    // club could be  coach or student
    club:'coach',
    manager:true,
    name:'khashayar',
    packageRemainingDays: '',
    certificate:[
      {
        organization: 'anjoman',
        role: 'coach',
        level: 'advance'
      },
      {
        organization: 'keshvari',
        role: 'tandem',
        level: 'tandem'
      }
    ],
    userId:'',
    flightHour:'',
    flightCount:'',
    coachingHours:'',
  };


  const userSlice = createSlice({
    name: 'user',
    initialState,
    
    reducers: {
      updateUserRole: (state, action) => {
        state.userRole = action.payload;
      },
      updateName: (state, action) => {
        state.name = action.payload;
      },
      updatePackageRemainingsDays: (state, action) => {
        state.packageRemainingDays = action.payload;
      },
      updateCertificate: (state, action) => {
        state.certificate = action.payload;
      },
      updateUserId: (state, action) => {
        state.userId = action.payload;
      },
      updateFlightHour: (state, action) => {
        state.flightHour = action.payload;
      },
      updateFlightCount: (state, action) => {
        state.flightCount = action.payload;
      },
      updateCouchingHours: (state, action) => {
        state.coachingHours = action.payload;
      },
    },
  });


export const { updateCertificate,updateCouchingHours, updateFlightCount, updateFlightHour, updateName, updatePackageRemainingsDays, updateUserId, updateUserRole } = userSlice.actions;
export default userSlice.reducer;
export const selectUser = (store) =>store.user;