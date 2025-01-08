import { useQuery } from "@tanstack/react-query";
import axios from 'axios';
import Cookies from 'js-cookie';
import { API_BASE_URL } from "../Providers/apiUrl";



// get flights histories
    const GetPracticalActivities = async (pageNumber, pageSize, courseId, wingId, harnessId, siteId, typeId, fromData, toData, coachUserId, status, countryId ,provinceId, groundHandlingType) => {
        const token = Cookies.get('token');

        try {   
            const response = await axios.get(`${API_BASE_URL}/practicalActivity/GetPracticalActivities?${pageNumber && `pageNumber=${pageNumber}&`}${pageSize && `pageSize=${pageSize}&`}userCourseId=${courseId}&wingId=${wingId}&harnessId=${harnessId}&siteId=${siteId}&type=${typeId}&fromDate=${fromData}&toDate=${toData}&coachUserId=${coachUserId}&status=${status}&groundHandlingType=${groundHandlingType || ''}${countryId  && `&countryId=${countryId}`}${provinceId && `&provinceId=${provinceId}`}`,
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

    const usePracticalActivities = (pageNumber, pageSize, courseId, wingId, harnessId, siteId, typeId, fromData, toData, coachUserId, status, countryId ,provinceId, groundHandlingType) => {
        return useQuery(['userPracticalActivities', pageNumber, pageSize, courseId, wingId, harnessId, siteId, typeId, fromData, toData, coachUserId, status, countryId ,provinceId, groundHandlingType],
            () => GetPracticalActivities(pageNumber, pageSize, courseId, wingId, harnessId, siteId, typeId, fromData, toData, coachUserId, status, countryId ,provinceId, groundHandlingType));
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