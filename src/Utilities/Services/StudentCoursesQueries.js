import { useQuery } from "@tanstack/react-query";
import axios from 'axios';
import { API_BASE_URL } from "../Providers/apiUrl";
import { getCommonHeaders } from "../Providers/headers";





// get student Course dividers in my courses
    const getUserCourseDividers = async () => {

        try {
        const response = await axios.get(`${API_BASE_URL}/UserCourse/GetUserCourseDividers`, { 
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

    const useUserCourseDividers = () => {
        return useQuery(['studentCourseDividers'], getUserCourseDividers);
    }





// get courses data
    const getUserCourses = async (type, organizationId, pageNumber) => {

        try {
            const response = await axios.get(`${API_BASE_URL}/UserCourse/GetUserCourses`, {
                headers: getCommonHeaders(),
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
        
        try {
            const response = await axios.get(`${API_BASE_URL}/UserCourse/GetUserCourse?userCourseId=${courseId}`, { 
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


    const useAUserCourse = (courseId) => {
        return useQuery(['aCourse', courseId], () => getAUserCourse(courseId));
    };






// getting a student course syllabi
    const getAUserCourseSyllabi = async (courseId) => {

        try {
            const response = await axios.get(`${API_BASE_URL}/UserCourse/GetUserCourseSyllabi?userCourseId=${courseId}`, { 
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

    const useAUserCourseSyllabi = (courseId) => {
        return useQuery(['aCourseSyllabi', courseId], () => getAUserCourseSyllabi(courseId));
    };






// get user course Classes
    const getUserCourseClasses = async (courseId) => {

        try {
            const response = await axios.get(`${API_BASE_URL}/UserCourse/GetUserCourseClasses?userCourseId=${courseId}`, { 
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

    const useUserCourseClasses = (courseId) => {
        return useQuery(['aCourseClasses', courseId], () => getUserCourseClasses(courseId));
    };







// get user a course Class 
    const getUserACourseClass = async (classId) => {

        try {
            const response = await axios.get(`${API_BASE_URL}/UserCourse/GetUserCourseClass?classId=${classId}`, { 
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

    const useAUserCourseClass = (classId) => {
        return useQuery(['aCourseClass', classId], () => getUserACourseClass(classId));
    };








// Get All User Courses For Dropdown
// /UserCourse/GetAllUserCoursesForDropdown 
    const getAllUserCoursesForDropdown = async () => {

        try {
            const response = await axios.get(`${API_BASE_URL}/UserCourse/GetAllUserCoursesForDropdown`, { 
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

    const useAllUserCoursesForDropdown = () => {
        return useQuery(['allUserCoursesForDropdown'], getAllUserCoursesForDropdown);
    };








// get guest user classes
// /UserCourse/GetGuestUserClasses
    const getGuestUserClasses = async () => {

        try {
            const response = await axios.get(`${API_BASE_URL}/UserCourse/GetGuestUserClasses`, { 
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

    const useGuestUserClasses = () => {
        return useQuery(['guestUserClasses'], () => getGuestUserClasses());
    };









// get a guest user class 
// i/UserCourse/GetGuestUserClass?guestUserClassId=1
    const getAGuestUserClass = async (classId) => {

        try {
            const response = await axios.get(`${API_BASE_URL}/UserCourse/GetGuestUserClass?guestUserClassId=${classId}`, { 
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

    const useAGuestUserClass = (classId) => {
        return useQuery(['aGuestUserClass', classId], () => getAGuestUserClass(classId));
    };





export { useUserCourseDividers, useUserCourses, useAUserCourse, useAUserCourseSyllabi , useUserCourseClasses, useAUserCourseClass, useAllUserCoursesForDropdown, useGuestUserClasses, useAGuestUserClass };