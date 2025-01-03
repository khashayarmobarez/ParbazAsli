import { useMutation, useQuery } from "@tanstack/react-query";
import axios from 'axios';
import Cookies from 'js-cookie';
import { API_BASE_URL } from "../Providers/apiUrl";



// Get All Cloud Cover Types
    const getCloudTypes = async () => {

        const token = Cookies.get('token');

        try {
        const response = await axios.get(`${API_BASE_URL}/CloudCoverType/GetAllCloudCoverTypes`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;

        } catch (error) {
            if (error.response.data.ErrorMessages[0].ErrorKey === 'login') {
                window.location.reload();
            } else {
                throw error;
            }
        }

    };

    const useCloudTypes = () => {
        return useQuery(['getCloudTypes'], getCloudTypes);
    }







// get countries list
// api/Country/GetAllCountries 
    const getCountries = async () => {
            
        const token = Cookies.get('token');

        try {
        const response = await axios.get(`${API_BASE_URL}/Country/GetAllCountries`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;

        } catch (error) {
            if (error.response.data.ErrorMessages[0].ErrorKey === 'login') {
                window.location.reload();
            } else {
                throw error;
            }
        }

    };


    const useCountries = () => {
        return useQuery(['getCountries'], getCountries, {
            cacheTime: 0,
            staleTime: Infinity,
        });
    }






// Get Provinces By CountryId
// /Province/GetProvincesByCountryId?countryId=1
    const getProvincesByCountryId = async (countryId) => {
            
        const token = Cookies.get('token');

        try {
        const response = await axios.get(`${API_BASE_URL}/Province/GetProvinces?${countryId && `countryId=${countryId}`}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;

        } catch (error) {
            if (error.response.data.ErrorMessages[0].ErrorKey === 'login') {
                window.location.reload();
            } else {
                throw error;
            }
        }

    };

    const useProvincesByCountryId = (countryId) => {
        return useQuery(['getProvincesByCountryId', countryId], () => getProvincesByCountryId(countryId), {
            cacheTime: 0,
            staleTime: Infinity,
        });
    }






// get flight sites by ProvinceId
    const getSitesByProvinceId = async (provinceId, countryId) => {
            
        const token = Cookies.get('token');

        try {
        const response = await axios.get(`${API_BASE_URL}/Site/GetSites?${provinceId && `provinceId=${provinceId}&`}${countryId && `countryId=${countryId}&`} `, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;

        } catch (error) {
            if (error.response.data.ErrorMessages[0].ErrorKey === 'login') {
                window.location.reload();
            } else {
                throw error;
            }
        }

    };

    const useSitesByProvinceId = (provinceId, countryId) => {
        return useQuery(['getSitesByProvinceId', provinceId, countryId], () =>  getSitesByProvinceId(provinceId, countryId));
    }






//  get all take off types
    const getTakeoffTypes = async () => {
            
        const token = Cookies.get('token');

        try {
        const response = await axios.get(`${API_BASE_URL}/TakeoffType/GetAllTakeoffTypes`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;

        } catch (error) {
            if (error.response.data.ErrorMessages[0].ErrorKey === 'login') {
                window.location.reload();
            } else {
                throw error;
            }
        }

    };

    const useTakeoffTypes = () => {
        return useQuery(['getTakeoffTypes'], getTakeoffTypes);
    }





    


// get user available flight types
// /Flight/GetFlightTypes 
    const getFlightTypes = async () => {
            
        const token = Cookies.get('token');

        try {
        const response = await axios.get(`${API_BASE_URL}/Flight/GetFlightTypes`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;

        } catch (error) {
            if (error.response.data.ErrorMessages[0].ErrorKey === 'login') {
                window.location.reload();
            } else {
                throw error;
            }
        }

    };

    const useFlightTypes = () => {
        return useQuery(['getFlightTypes'], getFlightTypes);
    }







// add course flight
    const addCourseFlight = async (formData) => {
        
        const token = Cookies.get('token');

        try {
            const response = await axios.post(`${API_BASE_URL}/Flight/AddCourseFlight`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            if (error.response.data.ErrorMessages[0].ErrorKey === 'login') {
                window.location.reload();
            } else {
                throw error;
            }
        }
    };

    const useAddCourseFlight = () => {
        return useMutation(addCourseFlight);
    };






// add Solo flight
    const addSoloFlight = async (formData) => {

        const token = Cookies.get('token');

        try {
            const response = await axios.post(`${API_BASE_URL}/Flight/AddSoloFlight`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            if (error.response.data.ErrorMessages[0].ErrorKey === 'login') {
                window.location.reload();
            } else {
                throw error;
            }
        }
    };

    const useAddSoloFlight = () => {
        return useMutation(addSoloFlight);
    };






// add Tandem flight
    const addTandemFlight = async (formData) => {

        const token = Cookies.get('token');

        try {
            const response = await axios.post(`${API_BASE_URL}/Flight/AddTandemFlight`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            if (error.response.data.ErrorMessages[0].ErrorKey === 'login') {
                window.location.reload();
            } else {
                throw error;
            }
        }
    };

    const useAddTandemFlight = () => {
        return useMutation(addTandemFlight);
    };



// get all landing types
// /LandingType/GetAllLandingTypes
    const getLandingTypes = async () => {
            
        const token = Cookies.get('token');

        try {
        const response = await axios.get(`${API_BASE_URL}/LandingType/GetAllLandingTypes`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;

        } catch (error) {
            if (error.response.data.ErrorMessages[0].ErrorKey === 'login') {
                window.location.reload();
            } else {
                throw error;
            }
        }

    };

    const useLandingTypes = () => {
        return useQuery(['getLandingTypes'], getLandingTypes);
    }






    





export { useCloudTypes, useCountries, useProvincesByCountryId, useSitesByProvinceId, useTakeoffTypes , useFlightTypes , useAddCourseFlight, useAddSoloFlight, useAddTandemFlight, useLandingTypes};