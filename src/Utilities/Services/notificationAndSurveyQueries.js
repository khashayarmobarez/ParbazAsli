import { useMutation, useQuery } from "@tanstack/react-query";
import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = 'https://api.par-baz.ir/api'



// get notifications
    const getNotifications = async (pageNumber, pageSize) => {

        const token = Cookies.get('token');

        try {
        const response = await axios.get(`${BASE_URL}/Notification/GetNotifications?pageNumber=${pageNumber}&pageSize=${pageSize}`, {
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

    const useNotifications = (pageNumber,pageSize) => {
        return useQuery(['userNotifications',pageNumber,pageSize], () => getNotifications(pageNumber,pageSize));
    }









// get notification counts
    const getUnreadNotificationCounts = async () => {

        const token = Cookies.get('token');

        if (!token) {
            throw new Error('No token found');
        }

        try {
        const response = await axios.get(`${BASE_URL}/Notification/GetUnreadNotificationsCount`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
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
        const response = await axios.get(`${BASE_URL}/Survey/IsSurveyAvailable?id=${surveyId}`, {
            headers: {
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

    const useIsSurveyAvailabe = (surveyId) => {
        return useQuery(['isSurveyAvailable', surveyId], () => getIsSurveyAvailable(surveyId));
    }









// submit tandem passenger survey
    const uploadSurvey = async (formData) => {
        const token = Cookies.get('token');
        
        try {
            const response = await axios.post(`${BASE_URL}/Survey/SubmitSurvey`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
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