import { useQuery } from "@tanstack/react-query";
import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = 'https://api.par-baz.ir/api'



// get student Course dividers in my courses
    const getUserCourseDividers = async () => {

        const token = Cookies.get('token');

        try {
        const response = await axios.get(`${BASE_URL}/UserCourse/GetUserCourseDividers`, {
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
            const response = await axios.get(`${BASE_URL}/UserCourse/GetUserCourses`, {
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
            const response = await axios.get(`${BASE_URL}/UserCourse/GetUserCourse?userCourseId=${courseId}`, {
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
            const response = await axios.get(`${BASE_URL}/UserCourse/GetUserCourseSyllabi?userCourseId=${courseId}`, {
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
            const response = await axios.get(`${BASE_URL}/UserCourse/GetUserCourseClasses?userCourseId=${courseId}`, {
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
            const response = await axios.get(`${BASE_URL}/UserCourse/GetUserCourseClass?classId=${classId}`, {
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













export { useUserCourseDividers, useUserCourses, useAUserCourse, useAUserCourseSyllabi , useUserCourseClasses, useAUserCourseClass };