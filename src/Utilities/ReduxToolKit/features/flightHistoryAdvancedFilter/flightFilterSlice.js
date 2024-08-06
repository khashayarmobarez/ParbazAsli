import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    courseFilter: {name:'', id:''},
    wingFilter:{name:'', id:''},
    harnessFilter: {name:'', id:''},
    countryFilter:{name:'', id:''},
    provinceFilter:{name:'', id:''},
    // site
    siteFilter:{name:'', id:''},
    flightTypeFilter:{name:'', id:''},
    coachNameFilter:{name:'', id:''},
    flightStatusFilter:{name:'', id:''},
    fromDateFilter:'',
    toDateFilter:'',
  };


const flightFilterSlice = createSlice({
    name: 'flightFilter',
    initialState,
    reducers: {
        updateCourseFilter: (state, action) => {
            state.courseFilter = action.payload;
        },
        updateWingFilter: (state, action) => {
            state.wingFilter = action.payload;
        },
        updateHarnessFilter: (state, action) => {
            state.harnessFilter = action.payload;
        },
        updateCountryFilter: (state, action) => {
            state.countryFilter = action.payload;
            // Clear dependent filters when country changes
            state.provinceFilter = null;
            state.siteFilter = null;
        },
        updateProvinceFilter: (state, action) => {
            state.provinceFilter = action.payload;
        },
        updateSiteFilter: (state, action) => {
            state.siteFilter = action.payload;
        },
        updateFlightTypeFilter: (state, action) => {
            state.flightTypeFilter = action.payload;
        },
        updateCoachNameFilter: (state, action) => {
            state.coachNameFilter = action.payload;
        },
        updateFlightStatusFilter: (state, action) => {
            state.flightStatusFilter = action.payload;
        },
        updateFromDateFilter: (state, action) => {
            state.fromDateFilter = action.payload;
        },
        updateToDateFilter: (state, action) => {
            state.toDateFilter = action.payload;
        },
        resetAllFilters: (state) => {
            state.courseFilter = {name:'', id:''};
            state.wingFilter = {name:'', id:''};
            state.harnessFilter = {name:'', id:''};
            state.countryFilter = {name:'', id:''};
            state.provinceFilter = {name:'', id:''};
            state.siteFilter = {name:'', id:''};
            state.flightTypeFilter = {name:'', id:''};
            state.coachNameFilter = {name:'', id:''};
            state.flightStatusFilter = {name:'', id:''};
            state.fromDateFilter = '';
            state.toDateFilter = '';
        },
    },
});


export const {
    updateCourseFilter,
    updateWingFilter,
    updateHarnessFilter,
    updateCountryFilter,
    updateProvinceFilter,
    updateSiteFilter,
    updateFlightTypeFilter,
    updateCoachNameFilter,
    updateFlightStatusFilter,
    updateFromDateFilter,
    updateToDateFilter,
    resetAllFilters
} = flightFilterSlice.actions;

export default flightFilterSlice.reducer;
export const selectFlightFilter = (store) =>store.flightFilter;