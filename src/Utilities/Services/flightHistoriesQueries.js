import { useQuery } from "@tanstack/react-query";
import axios from 'axios';
import Cookies from 'js-cookie';
import { API_BASE_URL } from "../Providers/apiUrl";



// get flights histories
    const GetPracticalActivities = async (pageNumber, pageSize, courseId, wingId, harnessId, siteId, typeId, fromData, toData, coachUserId, status, countryId ,provinceId) => {
        const token = Cookies.get('token');

        try {   
            const response = await axios.get(`${API_BASE_URL}/practicalActivity/GetPracticalActivities?${pageNumber && `pageNumber=${pageNumber}&`}${pageSize && `pageSize=${pageSize}&`}userCourseId=${courseId}&wingId=${wingId}&harnessId=${harnessId}&siteId=${siteId}&type=${typeId}&fromDate=${fromData}&toDate=${toData}&coachUserId=${coachUserId}&status=${status}${countryId  && `&countryId=${countryId}`}${provinceId && `&provinceId=${provinceId}`}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        } catch (error) {
            if (error.response && error.response.data.ErrorMessages[0].ErrorKey === 'login') {
                window.location.reload();
            } else {
                throw error;
            }
        }
    };

    const usePracticalActivities = (pageNumber, pageSize, courseId, wingId, harnessId, siteId, typeId, fromData, toData, coachUserId, status, countryId ,provinceId) => {
        return useQuery(['userPracticalActivities', pageNumber, pageSize, courseId, wingId, harnessId, siteId, typeId, fromData, toData, coachUserId, status, countryId ,provinceId],
            () => GetPracticalActivities(pageNumber, pageSize, courseId, wingId, harnessId, siteId, typeId, fromData, toData, coachUserId, status, countryId ,provinceId));
    };







// get a flight
    const getAUserFlight = async (flightId) => {
        const token = Cookies.get('token');

        try {
            const response = await axios.get(`${API_BASE_URL}/Flight/GetFlight?flightId=${flightId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        } catch (error) {
            if (error.response && error.response.data.ErrorMessages[0].ErrorKey === 'login') {
                window.location.reload();
            } else {
                throw error;
            }
        }
    };

    const useAUserFlight = (flightId) => {
        return useQuery(['aFlight', flightId], () => getAUserFlight(flightId));
    };




export { usePracticalActivities, useAUserFlight };