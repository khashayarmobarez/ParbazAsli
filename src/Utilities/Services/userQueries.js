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
                throw error;
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








// get all user certificates
    const getAllUserCertificates = async (pageNumber, pageSize) => {

        const token = Cookies.get('token');

        try {
            const response = await axios.get(`${BASE_URL}/Certificate/GetAllCertificates?pageNumber=${pageNumber}&pageSize=${pageSize}`, {
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

    const useAllUserCertificates = (pageNumber, pageSize) => {
        return useQuery(['AllUserCertificates', pageNumber, pageSize], () => getAllUserCertificates(pageNumber, pageSize));
    }






// request change phone number to get verification code query
    const postSendCodeToChangePhoneNumber = async (newPhoneOrEmail) => {
        const token = Cookies.get('token');
        try {
            const response = await axios.post(`${BASE_URL}/user/SendVerificationCodeForChanging`, newPhoneOrEmail, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        } catch (error) {
                throw error;
        }

    };

    const useSendVerificattionCodeToChange = () => {
        return useMutation(postSendCodeToChangePhoneNumber);
    }









// handle final submit for changing phone number
    const postChangePhoneNumber = async (newPhoneNumber) => {
        const token = Cookies.get('token');
        try {
            const response = await axios.post(`${BASE_URL}/user/ChangePhoneNumber`, newPhoneNumber, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        } catch (error) {
                throw error;
        }

    };

    const useChangePhoneNumber = () => {
        return useMutation(postChangePhoneNumber);
    }









// handle final submit for changing phone number
    const postChangeEmail = async (newEmail) => {
        const token = Cookies.get('token');
        try {
            const response = await axios.post(`${BASE_URL}/user/ChangeEmail`, newEmail, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        } catch (error) {
                throw error;
        }

    };

    const useChangeEmail = () => {
        return useMutation(postChangeEmail);
    }












// handle final submit for change password
// /User/ChangePassword
    const postChangePassword = async (newPassword) => {
        const token = Cookies.get('token');
        try {
            const response = await axios.post(`${BASE_URL}/User/ChangePassword`, newPassword, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        } catch (error) {
                throw error;
        }

    }


    const useChangePassword = () => {
        return useMutation(postChangePassword);
    }








export {useUserData, useUploadProfilePicture, useDeleteProfilePicture, useUserProfile, useAllUsersCoaches, useAllUserCertificates, useSendVerificattionCodeToChange , useChangePhoneNumber, useChangeEmail, useChangePassword};