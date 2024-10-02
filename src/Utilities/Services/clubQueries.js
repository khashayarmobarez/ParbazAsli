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
                const response = await axios.post(`${BASE_URL}/Club/AddCustomClubCourse`, course, {
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








// Get Active Club Coaches
// /Club/GetActiveClubCoaches
    const getActiveClubCoaches = async () => {
            
        const token = Cookies.get('token');

        try {
            const response = await axios.get(`${BASE_URL}/Club/GetActiveClubCoaches`, {
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

    const useGetActiveClubCoaches = () => {
        return useQuery(['getActiveClubCoaches'], getActiveClubCoaches);
    }







// get a club course
    const getClubCourse = async (courseId) => {
        const token = Cookies.get('token');

        try {
            const response = await axios.get(`${BASE_URL}/Club/GetClubCourse?courseId=${courseId}`, {
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

    const useGetClubCourse = (courseId) => {
        return useQuery(['getClubCourse', courseId], () => getClubCourse(courseId));
    };






// triggerclub course status
    const triggerClubCourseStatus = async (data) => {

        const token = Cookies.get('token');

        try {
            const response = await axios.post(`${BASE_URL}/Club/TriggerClubCourseStatus`, data, {
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

    const useTriggerClubCourseStatus = () => {
        return useMutation(triggerClubCourseStatus, {
            onSuccess: (data) => {
                // Handle success, e.g., show a notification, reset the form, etc.
                console.log('club course status triggerd succesfuly:', data);
            },
        });
    }









// get club course students
// /Club/GetClubCourseStudents?courseId=38&pageNumber=1
    const getClubCourseStudents = async (courseId, pageNumber) => {
        const token = Cookies.get('token');

        try {
            const response = await axios.get(`${BASE_URL}/Club/GetClubCourseStudents?courseId=${courseId}&pageNumber=${pageNumber}`, {
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

    const useGetClubCourseStudents = (courseId, pageNumber) => {
        return useQuery(['getClubCourseStudents', courseId, pageNumber], () => getClubCourseStudents(courseId, pageNumber));
    };








// get club course hsitory students
    const getClubCourseStudentsHistory = async (courseId, pageNumber) => {
        const token = Cookies.get('token');

        try {
            const response = await axios.get(`${BASE_URL}/Club/GetClubCourseStudentsHistory?courseId=${courseId}&pageNumber=${pageNumber}`, {
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

    const useGetClubCourseStudentsHistory = (courseId, pageNumber) => {
        return useQuery(['getClubCourseStudentsHistory', courseId, pageNumber], () => getClubCourseStudentsHistory(courseId, pageNumber));
    };







// get club course 
// /Club/GetClubCourse?courseId=38
const addStudentToClubCourse = async (student) => {
    const token = Cookies.get('token');

    try {
        const response = await axios.post(`${BASE_URL}/Club/AddStudentToClubCourse`, student, {
            headers: {
                'Authorization': `Bearer ${token}`,
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


const useAddStudentToClubCourse = () => {
    return useMutation(addStudentToClubCourse, {
        onSuccess: (data) => {
            // Handle success, e.g., show a notification, reset the form, etc.
            console.log('Student added to club course successfully:', data);
        },
    });
};








// get club course classes
    const getClubCourseClasses = async (courseId) => {
        const token = Cookies.get('token');

        try {
            const response = await axios.get(`${BASE_URL}/Club/GetClubCourseClasses?courseId=${courseId}`, {
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

    const useGetClubCourseClasses = (courseId) => {
        return useQuery(['getClubCourseClasses', courseId], () => getClubCourseClasses(courseId));
    };











// get club course syllabi
    const getClubCourseSyllabi = async (courseId, type) => {
        const token = Cookies.get('token');

        try {
            const response = await axios.get(`${BASE_URL}/Club/GetClubCourseSyllabi?courseId=${courseId}&type=${type}`, {
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
    }

    const useGetClubCourseSyllabi = (courseId, type) => {
        return useQuery(['getClubCourseSyllabi', courseId, type], () => getClubCourseSyllabi(courseId, type));
    }






// get club course class
    const getAClubClass = async (classId) => {
        const token = Cookies.get('token');

        try {
            const response = await axios.get(`${BASE_URL}/Club/GetClubCourseClass?classId=${classId}`, {
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

    const useAClubClass = (classId) => {
        return useQuery(['aClass', classId], () => getAClubClass(classId));
    };









// get club course student
// /Club/GetClubCourseStudent?userCourseId=45
    const getClubCourseStudent = async (userCourseId) => {
        const token = Cookies.get('token');

        try {
            const response = await axios.get(`${BASE_URL}/Club/GetClubCourseStudent?userCourseId=${userCourseId}`, {
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

    const useGetClubCourseStudent = (userCourseId) => {
        return useQuery(['getClubCourseStudent', userCourseId], () => getClubCourseStudent(userCourseId));
    };







// get club course student flights
// /Club/GetClubStudentFlights?userCourseId=45&pageNumber=1&pageSize=2
    const getClubCourseStudentFlights = async (userCourseId, pageNumber, pageSize) => {
        const token = Cookies.get('token');

        try {
            const response = await axios.get(`${BASE_URL}/Club/GetClubStudentFlights?userCourseId=${userCourseId}&pageNumber=${pageNumber}&pageSize=${pageSize}`, {
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

    const useClubCourseStudentFlights = (userCourseId, pageNumber, pageSize) => {
        return useQuery(['getClubCourseStudentFlights', userCourseId, pageNumber, pageSize], () => getClubCourseStudentFlights(userCourseId, pageNumber, pageSize));
    };









// get club student flight
// /Club/GetClubStudentFlight?flightId=30
    const getClubStudentFlight = async (flightId) => {
        const token = Cookies.get('token');

        try {
            const response = await axios.get(`${BASE_URL}/Club/GetClubStudentFlight?flightId=${flightId}`, {
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

    const useGetClubStudentFlight = (flightId) => {
        return useQuery(['getClubStudentFlight', flightId], () => getClubStudentFlight(flightId));
    };







// get club student classes
// /Club/GetClubStudentClasses?userCourseId=45
    const getClubStudentClasses = async (userCourseId) => {
        const token = Cookies.get('token');

        try {
            const response = await axios.get(`${BASE_URL}/Club/GetClubStudentClasses?userCourseId=${userCourseId}`, {
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

    const useClubStudentClasses = (userCourseId) => {
        return useQuery(['getClubStudentClasses', userCourseId], () => getClubStudentClasses(userCourseId));
    };










// get club course student class
// /Club/GetClubStudentClass?classId=7
    const getClubCourseStudentClass = async (classId) => {
        const token = Cookies.get('token');

        try {
            const response = await axios.get(`${BASE_URL}/Club/GetClubStudentClass?classId=${classId}`, {
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

    const useClubCourseStudentClass = (classId) => {
        return useQuery(['getClubCourseStudentClass', classId], () => getClubCourseStudentClass(classId));
    };








// get club course student syllabi
// /Club/GetClubStudentSyllabi?userCourseId=45
    const getClubCourseStudentSyllabi = async (userCourseId) => {
        const token = Cookies.get('token');

        try {
            const response = await axios.get(`${BASE_URL}/Club/GetClubStudentSyllabi?userCourseId=${userCourseId}`, {
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
    }

    const useGetClubCourseStudentSyllabi = (userCourseId) => {
        return useQuery(['getClubCourseStudentSyllabi', userCourseId], () => getClubCourseStudentSyllabi(userCourseId));
    }







// get club course counts
// /Club/GetClubCourseCounts
    const getClubCourseCounts = async () => {
        const token = Cookies.get('token');

        try {
            const response = await axios.get(`${BASE_URL}/Club/GetClubCourseCounts`, {
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
    }

    const useClubCourseCounts = () => {
        return useQuery(['getClubCourseCounts'], () => getClubCourseCounts());
    }




// get club all students divider
// /Club/GetAllClubStudents?type=1
    const getAllClubStudents = async (type) => {
        const token = Cookies.get('token');

        try {
            const response = await axios.get(`${BASE_URL}/Club/GetAllClubStudents?type=${type}`, {
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
    }

    const useAllClubStudents = (type) => {
        return useQuery(['getAllStudents', type], () => getAllClubStudents(type));
    }





// get student courses
// /Club/GetClubStudentCourses?studentUserId=676aoj
    const GetClubStudentCourses = async (id) => {
        const token = Cookies.get('token');

        try {
            const response = await axios.get(`${BASE_URL}/Club/GetClubStudentCourses?studentUserId=${id}`, {
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

    const useAClubStudentCourses = (id) => {
        return useQuery(['AClubStudentCourses', id], () => GetClubStudentCourses(id));
    } 



export { useClubStatus, useAddClub, useGetClub , useUploadClubPicture, useDeleteClubProfilePicture, useAddCoachToClub, useGetClubCoaches , useGetClubCoachesHistory, useGetCoachDetails , useGetCoachCourses , useGetClubCoursesDividers, useClubCourses, useAddRegularClubCourse, useAddRetrainingClubCourse, useAddCustomClubCourse, useTriggerCoachStatus, useGetActiveClubCoaches, useGetClubCourse, useTriggerClubCourseStatus, useGetClubCourseStudents, useGetClubCourseStudentsHistory, useAddStudentToClubCourse, useGetClubCourseClasses, useGetClubCourseSyllabi, useAClubClass, useGetClubCourseStudent, useClubCourseStudentFlights, useGetClubStudentFlight, useClubStudentClasses, useClubCourseStudentClass, useGetClubCourseStudentSyllabi, useClubCourseCounts, useAllClubStudents, useAClubStudentCourses };