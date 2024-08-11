import { useMutation, useQuery } from "@tanstack/react-query";
import Cookies from 'js-cookie';
import axios from 'axios';

const BASE_URL = 'https://api.digilogbook.ir/api'


// get cities by ProvinceId
const getCitiesByProvinceId = async (provinceId, countryId) => {
            
    const token = Cookies.get('token');

    try {
    const response = await axios.get(`${BASE_URL}/City/GetCitiesByProvinceId?${provinceId && `provinceId=${provinceId}&`}${countryId && `countryId=${countryId}&`} `, {
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

const useCitiesByProvinceId = (provinceId, countryId) => {
    return useQuery(['getSitesByProvinceId', provinceId, countryId], () =>  getSitesByProvinceId(provinceId, countryId));
}