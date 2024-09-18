import { useMutation, useQuery } from "@tanstack/react-query";
import Cookies from 'js-cookie';
import axios from 'axios';

const BASE_URL = 'https://api.digilogbook.ir/api'


// get cities by ProvinceId
    const getCitiesByProvinceId = async (provinceId) => {
                
        const token = Cookies.get('token');

        try {
        const response = await axios.get(`${BASE_URL}/City/GetCitiesByProvinceId?${provinceId && `provinceId=${provinceId}&`} `, {
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

    const useCitiesByProvinceId = (provinceId) => {
        return useQuery(['getSitesByProvinceId', provinceId], () =>  getCitiesByProvinceId(provinceId));
    }







// get flight counts
//  /Flight/Organization/GetFlightCounts?siteId=1&provinceId=31&fromDate=7/5/2024&toDate=7/11/2024
const getFlightCounts = async (siteId, provinceId, fromDate, toDate) => {
                
    const token = Cookies.get('token');

    try {
    const response = await axios.get(`${BASE_URL}/Flight/Organization/GetFlightCount?${siteId && `siteId=${siteId}&`}${provinceId && `provinceId=${provinceId}&`}${fromDate && `fromDate=${fromDate}&`}${toDate && `toDate=${toDate}&`}`, {
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

const useFlightCounts = (siteId, provinceId, fromDate, toDate) => {
    return useQuery(['getFlightCounts', siteId, provinceId, fromDate, toDate], () =>  getFlightCounts(siteId, provinceId, fromDate, toDate));
}









export { useCitiesByProvinceId, useFlightCounts }