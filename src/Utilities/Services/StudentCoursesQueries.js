import { useQuery } from "@tanstack/react-query";
import axios from 'axios';
import Cookies from 'js-cookie';
import { API_BASE_URL } from "../Providers/apiUrl";





// get student Course dividers in my courses
    const getUserCourseDividers = async () => {

        const token = Cookies.get('token');

        try {
        const response = await axios.get(`${API_BASE_URL}/UserCourse/GetUserCourseDividers`, {
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

    const useUserCourseDividers = () => {
        return useQuery(['studentCourseDividers'], getUserCourseDividers);
    }





// get courses data
    const getUserCourses = async (type, organizationId, pageNumber) => {
        const token = Cookies.get('token');

        try {
            const response = await axios.get(`${API_BASE_URL}/UserCourse/GetUserCourses`, {
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


    const useUserCourses = (type, organizationId, pageNumber) => {
        return useQuery(['courses', type, organizationId, pageNumber], () => getUserCourses(type, organizationId, pageNumber));
    };







// get one of the student course details
    const getAUserCourse = async (courseId) => {
        const token = Cookies.get('token');
        
        try {
            const response = await axios.get(`${API_BASE_URL}/UserCourse/GetUserCourse?userCourseId=${courseId}`, {
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


    const useAUserCourse = (courseId) => {
        return useQuery(['aCourse', courseId], () => getAUserCourse(courseId));
    };






// getting a student course syllabi
    const getAUserCourseSyllabi = async (courseId) => {
        const token = Cookies.get('token');

        try {
            const response = await axios.get(`${API_BASE_URL}/UserCourse/GetUserCourseSyllabi?userCourseId=${courseId}`, {
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

    const useAUserCourseSyllabi = (courseId) => {
        return useQuery(['aCourseSyllabi', courseId], () => getAUserCourseSyllabi(courseId));
    };






// get user course Classes
    const getUserCourseClasses = async (courseId) => {
        const token = Cookies.get('token');

        try {
            const response = await axios.get(`${API_BASE_URL}/UserCourse/GetUserCourseClasses?userCourseId=${courseId}`, {
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

    const useUserCourseClasses = (courseId) => {
        return useQuery(['aCourseClasses', courseId], () => getUserCourseClasses(courseId));
    };







// get user a course Class 
    const getUserACourseClass = async (classId) => {
        const token = Cookies.get('token');

        try {
            const response = await axios.get(`${API_BASE_URL}/UserCourse/GetUserCourseClass?classId=${classId}`, {
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

    const useAUserCourseClass = (classId) => {
        return useQuery(['aCourseClass', classId], () => getUserACourseClass(classId));
    };








// Get All User Courses For Dropdown
// /UserCourse/GetAllUserCoursesForDropdown 
    const getAllUserCoursesForDropdown = async () => {
        const token = Cookies.get('token');

        try {
            const response = await axios.get(`${API_BASE_URL}/UserCourse/GetAllUserCoursesForDropdown`, {
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

    const useAllUserCoursesForDropdown = () => {
        return useQuery(['allUserCoursesForDropdown'], getAllUserCoursesForDropdown);
    };








// get guest user classes
// /UserCourse/GetGuestUserClasses
    const getGuestUserClasses = async (courseId) => {
        const token = Cookies.get('token');

        try {
            const response = await axios.get(`${API_BASE_URL}/UserCourse/GetGuestUserClasses`, {
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

    const useGuestUserClasses = () => {
        return useQuery(['guestUserClasses'], () => getGuestUserClasses());
    };









// get a guest user class 
// i/UserCourse/GetGuestUserClass?guestUserClassId=1
    const getAGuestUserClass = async (classId) => {
        const token = Cookies.get('token');

        try {
            const response = await axios.get(`${API_BASE_URL}/UserCourse/GetGuestUserClass?guestUserClassId=${classId}`, {
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

    const useAGuestUserClass = (classId) => {
        return useQuery(['aGuestUserClass', classId], () => getAGuestUserClass(classId));
    };





export { useUserCourseDividers, useUserCourses, useAUserCourse, useAUserCourseSyllabi , useUserCourseClasses, useAUserCourseClass, useAllUserCoursesForDropdown, useGuestUserClasses, useAGuestUserClass };