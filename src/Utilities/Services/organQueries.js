import { useMutation, useQuery } from "@tanstack/react-query";
import axios from 'axios';
import { API_BASE_URL } from "../Providers/apiUrl";
import { getCommonHeaders } from "../Providers/headers";



// get cities by ProvinceId
    const getCitiesByProvinceId = async (provinceId) => {

        try {
        const response = await axios.get(`${API_BASE_URL}/City/GetCitiesByProvinceId?${provinceId && `provinceId=${provinceId}&`} `, { 
            headers: getCommonHeaders() 
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

    try {
    const response = await axios.get(`${API_BASE_URL}/Flight/Organization/GetFlightCount?${siteId && `siteId=${siteId}&`}${provinceId && `provinceId=${provinceId}&`}${fromDate && `fromDate=${fromDate}&`}${toDate && `toDate=${toDate}&`}`, { 
        headers: getCommonHeaders() 
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