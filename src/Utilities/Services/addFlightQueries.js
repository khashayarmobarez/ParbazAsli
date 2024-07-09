import { useMutation, useQuery } from "@tanstack/react-query";
import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = 'https://api.par-baz.ir/api'



// Get All Cloud Cover Types
    const getCloudTypes = async () => {

        const token = Cookies.get('token');

        try {
        const response = await axios.get(`${BASE_URL}/CloudCoverType/GetAllCloudCoverTypes`, {
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
        const response = await axios.get(`${BASE_URL}/Country/GetAllCountries`, {
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
        return useQuery(['getCountries'], getCountries);
    }






// Get Provinces By CountryId
// /Province/GetProvincesByCountryId?countryId=1
    const getProvincesByCountryId = async (countryId) => {
            
        const token = Cookies.get('token');

        try {
        const response = await axios.get(`${BASE_URL}/Province/GetProvincesByCountryId?countryId=${countryId}`, {
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
        return useQuery(['getProvincesByCountryId', countryId], () => getProvincesByCountryId(countryId));
    }






// get flight sites by ProvinceId
    const getSitesByProvinceId = async (provinceId) => {
            
        const token = Cookies.get('token');

        try {
        const response = await axios.get(`${BASE_URL}/Site/GetSitesByProvinceId?provinceId=${provinceId}`, {
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

    const useSitesByProvinceId = (provinceId) => {
        return useQuery(['getSitesByProvinceId', provinceId], () => getSitesByProvinceId(provinceId));
    }






//  get all take off types
    const getTakeoffTypes = async () => {
            
        const token = Cookies.get('token');

        try {
        const response = await axios.get(`${BASE_URL}/TakeoffType/GetAllTakeoffTypes`, {
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





export { useCloudTypes, useCountries, useProvincesByCountryId, useSitesByProvinceId, useTakeoffTypes };