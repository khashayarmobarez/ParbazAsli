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





// get club data
    const getClub = async () => {
            
        const token = Cookies.get('token');

        try {
            const response = await axios.get(`${BASE_URL}/Club/GetClub`, {
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

    const useGetClub = () => {
        return useQuery(['getClub'], getClub);
    }







// add Club picture
    const uploadClubPicture = async (formData) => {

        const token = Cookies.get('token');

        try {
            const response = await axios.post(`${BASE_URL}/Club/EditClubProfilePicture`, formData, {
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

    const useUploadClubPicture = () => {
        return useMutation(uploadClubPicture, {
            onSuccess: (data) => {
                // Handle success, e.g., show a notification, reset the form, etc.
                console.log('Club picture uploaded successfully:', data);
            },
            onError: (error) => {
                // Handle error, e.g., show an error message
                console.error('Error uploading Club picture:', error);
            },
        });
    };




// remove club profile picture
    const deleteClubProfilePicture = async () => {
        const token = Cookies.get('token');
        try {
            const response = await axios.post(`${BASE_URL}/Club/DeleteClubProfilePicture`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`,
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

const useDeleteClubProfilePicture = () => {
    return useMutation(deleteClubProfilePicture, {
        onSuccess: (data) => {
            console.log('club picture deleted successfully:', data);
        },
        onError: (error) => {
            console.error('Error deleting club picture:', error);
        },
    });
};




export { useClubStatus, useAddClub, useGetClub , useUploadClubPicture, useDeleteClubProfilePicture };