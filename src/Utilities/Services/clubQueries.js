import { useMutation, useQuery } from "@tanstack/react-query";
import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = 'https://api.par-baz.ir/api'



// Get All Cloud Cover Types
    const getClubStatus = async () => {

        const token = Cookies.get('token');

        try {
        const response = await axios.get(`${BASE_URL}/Club/GetClubStatus`, {
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

    const useClubStatus = () => {
        return useQuery(['getClubStatus'], getClubStatus);
    }








// Add Club
    const postClub = async (formData) => {

        const token = Cookies.get('token');

        try {
            const response = await axios.post(`${BASE_URL}/Club/AddClub`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
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

    const useAddClub = () => {
        return useMutation(postClub);
    };




export { useClubStatus, useAddClub };