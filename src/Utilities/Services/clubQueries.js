import { useMutation, useQuery } from "@tanstack/react-query";
import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = 'https://api.digilogbook.ir/api'



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








// post coach to club
// example /Club/AddCoachToClub?coachUserId=890soq
    const addCoachToClub = async (coachUserId) => {

        const token = Cookies.get('token');

        try {
            const response = await axios.post(`${BASE_URL}/Club/AddCoachToClub?coachUserId=${coachUserId}`, {}, {
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
        const token = Cookies.get('token');

        try {
            const response = await axios.get(`${BASE_URL}/Club/GetClubCoaches?pageNumber=${pageNumber}&pageSize=${pageSize}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
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
        const token = Cookies.get('token');

        try {
            const response = await axios.get(`${BASE_URL}/Club/GetClubCoachesHistory?pageNumber=${pageNumber}&pageSize=${pageSize}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
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

        const token = Cookies.get('token');

        try {
            const response = await axios.get(`${BASE_URL}/Club/GetCoachDetails?coachId=${coachId}`, {
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

    const useGetCoachDetails = (coachId) => {
        return useQuery(['getCoachDetails', coachId], () => getCoachDetails(coachId));
    };







// get coach courses
    const getCoachCourses = async (coachId) => {

        const token = Cookies.get('token');

        try {
            const response = await axios.get(`${BASE_URL}/Club/GetCoachCourses?coachId=${coachId}`, {
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

    const useGetCoachCourses = (coachId) => {
        return useQuery(['getCoachCourses', coachId], () => getCoachCourses(coachId));
    };








// get club courses dividers
// /Club/GetClubCourseDividers
    const getClubCoursesDividers = async () => {

        const token = Cookies.get('token');

        try {
            const response = await axios.get(`${BASE_URL}/Club/GetClubCourseDividers`, {
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

    const useGetClubCoursesDividers = () => {
        return useQuery(['clubCoursesDividers'], () => getClubCoursesDividers());
    };









// get club courses data
    const getClubCourses = async (type, organizationId, pageNumber) => {
        const token = Cookies.get('token');

        try {
            const response = await axios.get(`${BASE_URL}/Club/GetClubCourses`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                params: {
                    type,
                    organizationId,
                    pageNumber
                }
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


    const useClubCourses = (type, organizationId, pageNumber) => {
        return useQuery(['clubCourses', type, organizationId, pageNumber], () => getClubCourses(type, organizationId, pageNumber));
    };









// add course for club
// /club/addCourse 
    // add regular club course query 
        const addRegularCLubCourse = async (course) => {

            const token = Cookies.get('token');

            try {
                const response = await axios.post(`${BASE_URL}/Club/AddRegularClubCourse`, course, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
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

        const useAddRegularClubCourse = () => {
            return useMutation(addRegularCLubCourse, {
                onSuccess: (data) => {
                    // Handle success, e.g., show a notification, reset the form, etc.
                    console.log('Course added successfully:', data);
                },
            });
        }


    



    // add retraining course query 
        const addRetrainingClubCourse = async (course) => {
            const token = Cookies.get('token');

            try {
                const response = await axios.post(`${BASE_URL}/Club/AddRetrainingClubCourse`, course, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
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

        const useAddRetrainingClubCourse = () => {
            return useMutation(addRetrainingClubCourse, {
                onSuccess: (data) => {
                    // Handle success, e.g., show a notification, reset the form, etc.
                    console.log('Course added successfully:', data);
                },
            });
        }

    



    // add custom course query
        const addCustomCLubCourse = async (course) => {
            const token = Cookies.get('token');

            try {
                const response = await axios.post(`${BASE_URL}/Course/AddCustomCourse`, course, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
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

        const useAddCustomClubCourse = () => {
            return useMutation(addCustomCLubCourse, {
                onSuccess: (data) => {
                    // Handle success, e.g., show a notification, reset the form, etc.
                    console.log('Course added successfully:', data);
                },
            });
        }









// handle trigger coach status
    // /Club/TriggerCoachStatus
    const PostTriggerCoachStatus = async (course) => {

        const token = Cookies.get('token');

        try {
            const response = await axios.post(`${BASE_URL}/Club/TriggerCoachStatus`, course, {
                headers: {
                    'Authorization': `Bearer ${token}`,
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

    const useTriggerCoachStatus = () => {
        return useMutation(PostTriggerCoachStatus, {
            onSuccess: (data) => {
                // Handle success, e.g., show a notification, reset the form, etc.
                console.log('coach status triggerd succesfuly:', data);
            },
        });
    }






export { useClubStatus, useAddClub, useGetClub , useUploadClubPicture, useDeleteClubProfilePicture, useAddCoachToClub, useGetClubCoaches , useGetClubCoachesHistory, useGetCoachDetails , useGetCoachCourses , useGetClubCoursesDividers, useClubCourses, useAddRegularClubCourse, useAddRetrainingClubCourse, useAddCustomClubCourse, useTriggerCoachStatus };