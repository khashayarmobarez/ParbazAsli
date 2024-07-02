import { useMutation, useQuery } from "@tanstack/react-query";
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const BASE_URL = 'https://api.par-baz.ir/api'


// get Syllabi by level id
const getSyllabiForLevels = async (levelId) => {
    try {
      const token = Cookies.get('token');
      const response = await axios.get(`${BASE_URL}/Syllabus/GetSyllabiByLevelId?levelId=${levelId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
      // console.log(response.data);  
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch organs');
    }
  };

  // use data
  const useSyllabiForLevels = (levelId) => {
    return useQuery(['levelSyllabi', levelId], () => getSyllabiForLevels(levelId), {
        enabled: !!levelId, // This ensures the query runs only if organId is not null/undefined
    });
  };




  

// add regular course query https://api.par-baz.ir/api/Course/AddRegularCourse
    const addRegularCourse = async (course) => {
        const token = Cookies.get('token');
        const response = await axios.post(`${BASE_URL}/Course/AddRegularCourse`, course, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (response.status !== 200) {
            throw new Error('Failed to add course');
        }

        return response.data;
    };

    const useAddRegularCourse = () => {
        return useMutation(addRegularCourse, {
            onSuccess: (data) => {
                // Handle success, e.g., show a notification, reset the form, etc.
                console.log('Course added successfully:', data);
            },
        });
    }


    



// add retraining course query https://api.par-baz.ir/api/Course/AddRetrainingCourse
    const addRetrainingCourse = async (course) => {
        const token = Cookies.get('token');
        const response = await axios.post(`${BASE_URL}/Course/AddRetrainingCourse`, course, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (response.status !== 200) {
            throw new Error('Failed to add course');
        }

        return response.data;
    };

    const useAddRetrainingCourse = () => {
        return useMutation(addRetrainingCourse, {
            onSuccess: (data) => {
                // Handle success, e.g., show a notification, reset the form, etc.
                console.log('Course added successfully:', data);
            },
        });
    }

    



// add custom course query https://api.par-baz.ir/api/Course/AddCustomCourse
    const addCustomCourse = async (course) => {
        const token = Cookies.get('token');
        const response = await axios.post(`${BASE_URL}/Course/AddCustomCourse`, course, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (response.status !== 200) {
            throw new Error('Failed to add course');
        }

        return response.data;
    };

    const useAddCustomCourse = () => {
        return useMutation(addCustomCourse, {
            onSuccess: (data) => {
                // Handle success, e.g., show a notification, reset the form, etc.
                console.log('Course added successfully:', data);
            },
        });
    }





// get Course dividers in education
    const getCourseDividers = async () => {

        const token = Cookies.get('token');

        try {
        const response = await axios.get(`${BASE_URL}/Course/GetCourseDividers`, {
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

    const useCourseDividers = () => {
        return useQuery(['courseDividers'], getCourseDividers);
    }



// get courses data
    const getCourses = async (type, organizationId, pageNumber) => {
        const token = Cookies.get('token');

        try {
            const response = await axios.get(`${BASE_URL}/Course/GetCourses`, {
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


    const useCourses = (type, organizationId, pageNumber) => {
        return useQuery(['courses', type, organizationId, pageNumber], () => getCourses(type, organizationId, pageNumber));
    };




// post trigger course status
    const postTriggerCourseStatus = async ({ courseId, status }) => {
        const token = Cookies.get('token');

        try {
            const response = await axios.post(
                `${BASE_URL}/Course/TriggerCourseStatus`,
                { courseId, status },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            return response.data;
        } catch (error) {
            if (error.response && error.response.data.ErrorMessages[0].ErrorKey === 'login') {
                window.location.reload();
            } else {
                throw error;
            }
        }
    };

    const useTriggerCourseStatus = () => {

        const navigate = useNavigate()

        return useMutation(postTriggerCourseStatus, {
            onSuccess: () => {
                toast('دوره شما با موفقیت تایید شد', {
                    type: 'success',
                    position: 'top-right',
                    autoClose: 5000,
                    theme: 'dark',
                    style: { width: "90%" }
                });
                navigate('/education');
            },
            onError: (error) => {
                let errorMessage = 'خطایی رخ داده است';
                if (error.response && error.response.data && error.response.data.ErrorMessages) {
                    errorMessage = error.response.data.ErrorMessages[0].ErrorMessage;
                }
                toast(errorMessage, {
                    type: 'error',
                    position: 'top-right',
                    autoClose: 5000,
                    theme: 'dark',
                    style: { width: "90%" }
                });
            }
        });
    };




    
    
    
    
    // get a course details
    const getACourse = async (courseId) => {
        const token = Cookies.get('token');
        
        try {
            const response = await axios.get(`${BASE_URL}/Course/GetCourse?courseId=${courseId}`, {
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
    
    
    const useACourse = (courseId) => {
        return useQuery(['aCourse', courseId], () => getACourse(courseId));
    };




    

    
// get a course students data
    const getACourseStudents = async (courseId, pageNumber) => {
        const token = Cookies.get('token');

        try {
            const response = await axios.get(`${BASE_URL}/Course/GetCourseStudents?courseId=${courseId}&pageNumber=${pageNumber}`, {
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


    const useACourseStudents = (courseId,pageNumber) => {
        return useQuery(['aCourseStudents', courseId], () => getACourseStudents(courseId, pageNumber));
    };





export { useAddRegularCourse, useSyllabiForLevels, useAddRetrainingCourse, useAddCustomCourse, useCourseDividers, useCourses, useTriggerCourseStatus ,useACourse, useACourseStudents }; 