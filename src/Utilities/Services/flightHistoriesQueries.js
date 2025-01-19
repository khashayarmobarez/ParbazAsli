import { useQuery } from "@tanstack/react-query";
import axios from 'axios';
import Cookies from 'js-cookie';
import { API_BASE_URL } from "../Providers/apiUrl";



// get flights histories
    const GetPracticalActivities = async (pageNumber, pageSize, courseId, wingId, harnessId, siteId, flightTypeId, fromData, toData, coachUserId, status, countryId ,provinceId, groundHandlingType, activityType) => {
        const token = Cookies.get('token');

        try {   
            const response = await axios.get(`${API_BASE_URL}/practicalActivity/GetPracticalActivities?${pageNumber && `pageNumber=${pageNumber}&`}${pageSize && `pageSize=${pageSize}&`}userCourseId=${courseId}&wingId=${wingId}&harnessId=${harnessId}&siteId=${siteId}&flightType=${flightTypeId}&fromDate=${fromData}&toDate=${toData}&coachUserId=${coachUserId}&status=${status}&groundHandlingType=${groundHandlingType || ''}${countryId  && `&countryId=${countryId}`}${provinceId && `&provinceId=${provinceId}`}${activityType && `&type=${activityType}`}`,
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

    const usePracticalActivities = (pageNumber, pageSize, courseId, wingId, harnessId, siteId, flightTypeId, fromData, toData, coachUserId, status, countryId ,provinceId, groundHandlingType, activityType) => {
        return useQuery(['userPracticalActivities', pageNumber, pageSize, courseId, wingId, harnessId, siteId, flightTypeId, fromData, toData, coachUserId, status, countryId ,provinceId, groundHandlingType, activityType],
            () => GetPracticalActivities(pageNumber, pageSize, courseId, wingId, harnessId, siteId, flightTypeId, fromData, toData, coachUserId, status, countryId ,provinceId, groundHandlingType, activityType));
    };







// get a flight
    const GetPracticalActivity = async (practicalActivityId) => {
        const token = Cookies.get('token');

        try {
            const response = await axios.get(`${API_BASE_URL}/practicalActivity/GetPracticalActivity?practicalActivityId=${practicalActivityId}`, {
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

    const usePracticalActivity = (practicalActivityId) => {
        return useQuery(['usePracticalActivity', practicalActivityId], () => GetPracticalActivity(practicalActivityId));
    };




export { usePracticalActivities, usePracticalActivity };