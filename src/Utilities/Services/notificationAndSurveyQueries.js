import { useQuery } from "@tanstack/react-query";
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
        return useQuery(['userNotifications'], () => getNotifications(pageNumber,pageSize));
    }









// get notification counts
    const getUnreadNotificationCounts = async () => {

        const token = Cookies.get('token');

        try {
        const response = await axios.get(`${BASE_URL}/Notification/GetUnreadNotificationsCount`, {
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

    const useUnreadNotificationCounts = () => {
        return useQuery(['userUnreadNotificationCounts'], () => getUnreadNotificationCounts());
    }





export { useNotifications, useUnreadNotificationCounts }