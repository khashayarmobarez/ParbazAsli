import { useQuery } from "@tanstack/react-query";
import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = 'https://api.par-baz.ir/api'


// get student course flights
const getUserFlights = async (pageNumber, pageSize, courseId) => {
    const token = Cookies.get('token');

    try {
        const response = await axios.get(`${BASE_URL}/Flight/GetFlights?${pageNumber && `pageNumber=${pageNumber}&`}${pageSize && `pageSize=${pageSize}&`}${courseId && `userCourseId=${courseId}&`}`,
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

const useUserFlights = (pageNumber, pageSize, courseId) => {
    return useQuery(['userFlights', pageNumber, pageSize, courseId], () => getUserFlights(pageNumber, pageSize, courseId));
};







// get a student course flight
const getAUserFlight = async (flightId) => {
    const token = Cookies.get('token');

    try {
        const response = await axios.get(`${BASE_URL}/Flight/GetFlight?flightId=${flightId}`, {
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




export { useUserFlights, useAUserFlight };