import { useMutation, useQuery } from "@tanstack/react-query";
import axios from 'axios';
import Cookies from 'js-cookie';
import { API_BASE_URL } from "../Providers/apiUrl";
import { getCommonHeaders } from "../Providers/headers";




// Get All Cloud Cover Types
    const getClubStatus = async () => {


        try {
        const response = await axios.get(`${API_BASE_URL}/Club/GetClubStatus`, { 
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

    const useClubStatus = () => {
        return useQuery(['getClubStatus'], getClubStatus);
    }








// Add Club
    const postClub = async (formData) => {


        try {
            const response = await axios.post(`${API_BASE_URL}/Club/AddClub`, formData, { 
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

    const useAddClub = () => {
        return useMutation(postClub);
    };





// get club data
    const getClub = async () => {

        try {
            const response = await axios.get(`${API_BASE_URL}/Club/GetClub`, { 
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

    const useGetClub = () => {
        return useQuery(['getClub'], getClub);
    }







// add Club picture
    const uploadClubPicture = async (formData) => {

        try {
            const response = await axios.post(`${API_BASE_URL}/Club/EditClubProfilePicture`, formData, { 
                headers: getCommonHeaders('multipart/form-data') 
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

        try {
            const response = await axios.post(`${API_BASE_URL}/Club/DeleteClubProfilePicture`, {}, { 
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








// post coach to club
// example /Club/AddCoachToClub?coachUserId=890soq
    const addCoachToClub = async (coachUserId) => {


        try {
            const response = await axios.post(`${API_BASE_URL}/Club/AddCoachToClub?coachUserId=${coachUserId}`, {}, { 
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

    const useAddCoachToClub = (coachUserId) => {
        return useMutation(addCoachToClub, {
            mutationKey: ['addCoachToClub', coachUserId],
            enabled: coachUserId,
        });
    };





// getClubCoaches 
// /Club/GetClubCoaches?pageNumber=1&pageSize=5 
    const getClubCoaches = async ({ queryKey }) => {

        const [_key, pageNumber, pageSize] = queryKey;

        try {
            const response = await axios.get(`${API_BASE_URL}/Club/GetClubCoaches?pageNumber=${pageNumber}&pageSize=${pageSize}`, { 
                headers: getCommonHeaders() 
            });
            return response.data;
        } catch (error) {
            if (error.response?.data?.ErrorMessages[0]?.ErrorKey === 'login') {
                window.location.reload();
            } else {
                throw error;
            }
        }
    };

    const useGetClubCoaches = (pageNumber, pageSize) => {
        return useQuery(['getClubCoaches', pageNumber, pageSize], getClubCoaches);
    };







// get previous club coaches
// /Club/GetClubCoachesHistory?pageNumber=1&pageSize=5
    const getClubCoachesHistory = async ({ queryKey }) => {

        const [_key, pageNumber, pageSize] = queryKey;

        try {
            const response = await axios.get(`${API_BASE_URL}/Club/GetClubCoachesHistory?pageNumber=${pageNumber}&pageSize=${pageSize}`, { 
                headers: getCommonHeaders() 
            });
            return response.data;
        } catch (error) {
            if (error.response?.data?.ErrorMessages[0]?.ErrorKey === 'login') {
                window.location.reload();
            } else {
                throw error;
            }
        }
    };

    const useGetClubCoachesHistory = (pageNumber, pageSize) => {
        return useQuery(['getClubCoachesHistory', pageNumber, pageSize], getClubCoachesHistory);
    };








// get coach details
    const getCoachDetails = async (coachId) => {

        try {
            const response = await axios.get(`${API_BASE_URL}/Club/GetCoachDetails?coachId=${coachId}`, { 
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

    const useGetCoachDetails = (coachId) => {
        return useQuery(['getCoachDetails', coachId], () => getCoachDetails(coachId));
    };







// get coach courses
    const getCoachCourses = async (coachId) => {


        try {
            const response = await axios.get(`${API_BASE_URL}/Club/GetCoachCourses?coachId=${coachId}`, { 
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

    const useGetCoachCourses = (coachId) => {
        return useQuery(['getCoachCourses', coachId], () => getCoachCourses(coachId));
    };





// handle trigger coach status
    // /Club/TriggerCoachStatus
    const PostTriggerCoachStatus = async (course) => {


        try {
            const response = await axios.post(`${API_BASE_URL}/Club/TriggerCoachStatus`, course, { 
                headers: getCommonHeaders() 
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

    const useTriggerCoachStatus = () => {
        return useMutation(PostTriggerCoachStatus, {
            onSuccess: (data) => {
                // Handle success, e.g., show a notification, reset the form, etc.
                console.log('coach status triggerd succesfuly:', data);
            },
        });
    }








// Get Active Club Coaches
// /Club/GetActiveClubCoaches
    const getActiveClubCoaches = async () => {

        try {
            const response = await axios.get(`${API_BASE_URL}/Club/GetActiveClubCoaches`, { 
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

    const useGetActiveClubCoaches = () => {
        return useQuery(['getActiveClubCoaches'], getActiveClubCoaches);
    }






export { useClubStatus, useAddClub, useGetClub , useUploadClubPicture, useDeleteClubProfilePicture, useAddCoachToClub, useGetClubCoaches , useGetClubCoachesHistory, useGetCoachDetails , useGetCoachCourses , useTriggerCoachStatus, useGetActiveClubCoaches };