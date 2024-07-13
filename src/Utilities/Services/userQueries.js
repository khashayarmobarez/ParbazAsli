import { useMutation, useQuery } from "@tanstack/react-query";
import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = 'https://api.par-baz.ir/api'



// get userData query
    const fetchUserData = async () => {

        const token = Cookies.get('token');

        if (!token) {
            throw new Error('No token found');
        }

        try {
        const response = await axios.get(`${BASE_URL}/User/GetUser`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        if (error.response.data.ErrorMessages[0].ErrorKey === 'login') {
            window.location.reload();
        }
        }
    };

    const useUserData = () => {
        return useQuery(['userData'], fetchUserData);
    }



// add profile picture
    const uploadProfilePicture = async (formData) => {
        const token = Cookies.get('token');
        const response = await axios.post(`${BASE_URL}/User/EditProfilePicture`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });

        if (response.status !== 200) {
            throw new Error('Failed to upload profile picture');
        }

        return response.data;
    };

    const useUploadProfilePicture = () => {
        return useMutation(uploadProfilePicture, {
            onSuccess: (data) => {
                // Handle success, e.g., show a notification, reset the form, etc.
                console.log('Profile picture uploaded successfully:', data);
            },
            onError: (error) => {
                // Handle error, e.g., show an error message
                console.error('Error uploading profile picture:', error);
            },
        });
    };




// remove profile picture
    const deleteProfilePicture = async () => {
        const token = Cookies.get('token');
        const response = await axios.post(`${BASE_URL}/User/DeleteProfilePicture`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.status !== 200) {
            throw new Error('Failed to delete profile picture');
        }

        return response.data;
    };
    
    const useDeleteProfilePicture = () => {
        return useMutation(deleteProfilePicture, {
            onSuccess: (data) => {
                console.log('Profile picture deleted successfully:', data);
            },
            onError: (error) => {
                console.error('Error deleting profile picture:', error);
            },
        });
    };



// get Profile page data
    const getUserProfile = async () => {

        const token = Cookies.get('token');

        try {
        const response = await axios.get(`${BASE_URL}/User/GetUserProfile`, {
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

    const useUserProfile = () => {
        return useQuery(['profileData'], getUserProfile);
    }







//  get all user coaches
    const getAllUsersCoaches = async () => {

        const token = Cookies.get('token');

        try {
            const response = await axios.get(`${BASE_URL}/User/GetAllUsersCoaches`, {
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

    const useAllUsersCoaches = () => {
        return useQuery(['allUsersCoaches'], getAllUsersCoaches);
    }




export {useUserData, useUploadProfilePicture, useDeleteProfilePicture, useUserProfile, useAllUsersCoaches};