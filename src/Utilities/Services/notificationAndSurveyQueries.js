import { useMutation, useQuery } from "@tanstack/react-query";
import axios from 'axios';
import { API_BASE_URL } from "../Providers/apiUrl";
import { getCommonHeaders } from "../Providers/headers";





// get notifications
    const getNotifications = async (pageNumber, pageSize) => {


        try {
        const response = await axios.get(`${API_BASE_URL}/Notification/GetNotifications?pageNumber=${pageNumber}&pageSize=${pageSize}`, { 
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

    const useNotifications = (pageNumber,pageSize) => {
        return useQuery(['userNotifications',pageNumber,pageSize], () => getNotifications(pageNumber,pageSize));
    }









// get notification counts
    const getUnreadNotificationCounts = async () => {

        // const userType = Cookies.get('userType');

        // if (!token || userType === 'Organization') {
        //     throw new Error('No token found or user is not a pilot');
        // }

        try {
        const response = await axios.get(`${API_BASE_URL}/Notification/GetUnreadNotificationsCount`, { 
            headers: getCommonHeaders() 
        });
        return response.data;

        } catch (error) {
                throw error;
            }

    };

    const useUnreadNotificationCounts = () => {
        return useQuery(['userUnreadNotificationCounts'], () => getUnreadNotificationCounts());
    }









// check the tandem fight survey availablity
// no token
    const getIsSurveyAvailable = async (surveyId) => {

        try {
        const response = await axios.get(`${API_BASE_URL}/Survey/IsSurveyAvailable?surveyId=${surveyId}`, { 
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

    const useIsSurveyAvailabe = (surveyId) => {
        return useQuery(['isSurveyAvailable', surveyId], () => getIsSurveyAvailable(surveyId));
    }









// submit tandem passenger survey
    const uploadSurvey = async (formData) => {
        
        try {
            const response = await axios.post(`${API_BASE_URL}/Survey/SubmitSurvey`, formData, { 
                headers: getCommonHeaders() 
            });
            return response.data;
        } catch (error) {
                throw error;
            }
    };

    const useSubmitSurvey = () => {
        return useMutation(uploadSurvey);
    };










export { useNotifications, useUnreadNotificationCounts, useIsSurveyAvailabe, useSubmitSurvey }