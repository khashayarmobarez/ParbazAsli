import { useQuery } from "@tanstack/react-query";
import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = 'https://api.par-baz.ir/api'


// get flights histories
    const getUserFlights = async (pageNumber, pageSize, courseId, wingId, harnessId, siteId, tandem, fromData, toData, coachUserId, status) => {
        const token = Cookies.get('token');

        try {
            const response = await axios.get(`${BASE_URL}/Flight/GetFlights?${pageNumber && `pageNumber=${pageNumber}&`}${pageSize && `pageSize=${pageSize}&`}${courseId && `userCourseId=${courseId}&`}&wingId=${wingId}&harnessId=${harnessId}&siteId=${siteId}&type=${tandem}&fromDate=${fromData}&toDate=${toData}&coachUserId=${coachUserId}&status=${status}`,
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

    const useUserFlights = (pageNumber, pageSize, courseId, wingId, harnessId, siteId, tandem, fromData, toData, coachUserId, status) => {
        return useQuery(['userFlights', pageNumber, pageSize, courseId, wingId, harnessId, siteId, tandem, fromData, toData, coachUserId, status],
            () => getUserFlights(pageNumber, pageSize, courseId, wingId, harnessId, siteId, tandem, fromData, toData, coachUserId, status));
    };







// get a flight
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