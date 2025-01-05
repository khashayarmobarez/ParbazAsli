import { useMutation, useQuery } from "@tanstack/react-query";
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { API_BASE_URL } from "../Providers/apiUrl";



// get Syllabi by level id
const getSyllabiForLevels = async (levelId) => {
    try {
      const token = Cookies.get('token');
      const response = await axios.get(`${API_BASE_URL}/Syllabus/GetSyllabiByLevelId?levelId=${levelId}`, {
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




  

// add regular course query
    const addRegularCourse = async (course) => {
        const token = Cookies.get('token');
        const response = await axios.post(`${API_BASE_URL}/Course/AddRegularCourse`, course, {
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


    



// add retraining course query
    const addRetrainingCourse = async (course) => {
        const token = Cookies.get('token');
        const response = await axios.post(`${API_BASE_URL}/Course/AddRetrainingCourse`, course, {
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

    



// add custom course query 
    const addCustomCourse = async (course) => {
        const token = Cookies.get('token');
        const response = await axios.post(`${API_BASE_URL}/Course/AddCustomCourse`, course, {
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
    const getCourseDividers = async (isForClub) => {

        const token = Cookies.get('token');

        try {
        const response = await axios.get(`${API_BASE_URL}/Course/GetCourseDividers?isForClub=${isForClub || false}`, {
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

    const useCourseDividers = (isForClub) => {
        return useQuery(['courseDividers', isForClub], () => getCourseDividers(isForClub));
    }



// get courses data
    const getCourses = async (type, organizationId, pageNumber, isForClub) => {
        const token = Cookies.get('token');

        try {
            const response = await axios.get(`${API_BASE_URL}/Course/GetCourses`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                params: {
                    type,
                    organizationId,
                    pageNumber,
                    isForClub
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


    const useCourses = (type, organizationId, pageNumber, isForClub) => {
        return useQuery(['courses', type, organizationId, pageNumber, isForClub], () => getCourses(type, organizationId, pageNumber, isForClub));
    };



// post trigger course status
    const postTriggerCourseStatus = async (params) => {
        const token = Cookies.get('token');

        try {
            const response = await axios.post(
                `${API_BASE_URL}/Course/TriggerCourseStatus`,
                params,
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


        return useMutation(postTriggerCourseStatus, {
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
    const getACourse = async (courseId, isForClub) => {
        const token = Cookies.get('token');
        
        try {
            const response = await axios.get(`${API_BASE_URL}/Course/GetCourse?courseId=${courseId}&isForClub=${isForClub}`, {
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
    
    
    const useACourse = (courseId, isForClub) => {
        return useQuery(['aCourse', courseId, isForClub], () => getACourse(courseId, isForClub));
    };


    

    
// get a course students data
    const getACourseStudents = async (courseId, pageNumber, isForClub) => {
        const token = Cookies.get('token');

        try {
            const response = await axios.get(`${API_BASE_URL}/Course/GetCourseStudents?courseId=${courseId}&pageNumber=${pageNumber}&isForClub=${isForClub}`, {
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


    const useACourseStudents = (courseId,pageNumber, isForClub) => {
        return useQuery(['aCourseStudents', courseId, isForClub], () => getACourseStudents(courseId, pageNumber, isForClub));
    };




    

    
// get a course old students data
    const getACourseHistoryStudents = async (courseId, pageNumber, isForClub) => {
        const token = Cookies.get('token');

        try {
            const response = await axios.get(`${API_BASE_URL}/Course/GetCourseStudentsHistory?courseId=${courseId}&pageNumber=${pageNumber}&isForClub=${isForClub}`, {
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


    const useACourseHistoryStudents = (courseId,pageNumber, isForClub) => {
        return useQuery(['aCourseHistoryStudents', courseId, isForClub], () => getACourseHistoryStudents(courseId, pageNumber, isForClub));
    };




// add student to course  /Course/AddStudentToCourse
    const addStudentToCourse = async (student) => {
        const token = Cookies.get('token');

        try {
            const response = await axios.post(`${API_BASE_URL}/Course/AddStudentToCourse`, student, {
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

    const useAddStudentToCourse = () => {
        return useMutation(addStudentToCourse, {
            onSuccess: (data) => {
                // Handle success, e.g., show a notification, reset the form, etc.
                console.log('Student added successfully:', data);
            },
        });
    }






// get a course syllabi   /Course/GetCourseSyllabi?courseId=30&type=2
    const getACourseSyllabi = async (courseId, type, isForClub) => {
        const token = Cookies.get('token');

        try {
            const response = await axios.get(`${API_BASE_URL}/Course/GetCourseSyllabi?courseId=${courseId}&type=${type}&isForClub=${isForClub}`, {
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

    const useACourseSyllabi = (courseId, type, isForClub) => {
        return useQuery(['aCourseSyllabi', courseId, type, isForClub], () => getACourseSyllabi(courseId, type, isForClub));
    };





// get course classes Course/GetCourseClasses?courseId=30
    const getACourseClasses = async (courseId, isForClub) => {
        const token = Cookies.get('token');

        try {
            const response = await axios.get(`${API_BASE_URL}/Course/GetCourseClasses?courseId=${courseId}&isForClub=${isForClub}`, {
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

    const useACourseClasses = (courseId,isForClub) => {
        return useQuery(['aCourseClasses', courseId,isForClub], () => getACourseClasses(courseId, isForClub));
    };






// Get All Active Course Students /Course/GetAllActiveCourseStudents?courseId=30
    const getAllActiveCourseStudents = async (courseId) => {
        const token = Cookies.get('token');

        try {
            const response = await axios.get(`${API_BASE_URL}/Course/GetAllActiveCourseStudents?courseId=${courseId}`, {
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

    const useAllActiveCourseStudents = (courseId) => {
        return useQuery(['allActiveCourseStudents', courseId], () => getAllActiveCourseStudents(courseId));
    };





// add class to course /Course/AddCourseClass 
    const addCourseClass = async (courseClass) => {
        const token = Cookies.get('token');

        try {
            const response = await axios.post(`${API_BASE_URL}/Course/AddCourseClass`, courseClass, {
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

    const useAddCourseClass = () => {
        return useMutation(addCourseClass, {
            onSuccess: (data) => {
                // Handle success, e.g., show a notification, reset the form, etc.
                console.log('Class added successfully:', data);
            },
        });
    }




    

// get a class data /Course/GetCourseClass?classId=1
    const getAClass = async (classId, isForClub) => {
        const token = Cookies.get('token');

        try {
            const response = await axios.get(`${API_BASE_URL}/Course/GetCourseClass?classId=${classId}&isForClub=${isForClub}`, {
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

    const useAClass = (classId, isForClub) => {
        return useQuery(['aClass', classId, isForClub], () => getAClass(classId, isForClub));
    };



    

// get a class data /Course/GetCourseClass?classId=1
    const getUserCourseFlight = async (flightId) => {
        const token = Cookies.get('token');

        try {
            const response = await axios.get(`${API_BASE_URL}/Course/GetStudentFlight?flightId=${flightId}`, {
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

    const useUserCourseFlight = (flightId) => {
        return useQuery(['aUserCourseFlightData', flightId], () => getUserCourseFlight(flightId));
    };








// decline user flight
    const postDeclineUserFlight = async (flightId) => {
        const token = Cookies.get('token');

        try {
            const response = await axios.post(`${API_BASE_URL}/Course/RejectStudentFlight?flightId=${flightId}`, {}, {
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

    const useDeclineUserFlight = (flightId) => {
        return useMutation(postDeclineUserFlight, {
            mutationKey: ['declineUserFlight', flightId],
            enabled: flightId,
        });
    };








// accept user flight
    const postAcceptUserFlight = async (submitData) => {
        const token = Cookies.get('token');

        try {
            const response = await axios.post(`${API_BASE_URL}/Course/AcceptStudentFlight`, submitData, {
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

    const useAcceptUserFlight = () => {
        return useMutation(postAcceptUserFlight);
    }








    
// post trigger accept club
    const postTriggerClubStatus = async (triggerStatusForm) => {
        const token = Cookies.get('token');

        try {
            const response = await axios.post(
                `${API_BASE_URL}/Course/TriggerCoachClubStatus`,
                triggerStatusForm,
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

    const useTriggerClubStatus = () => {

        return useMutation(postTriggerClubStatus, {
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








    
// post trigger student status
    const postTriggerStudentStatus = async (triggerStatusForm) => {
        const token = Cookies.get('token');

        try {
            const response = await axios.post(
                `${API_BASE_URL}/Course/TriggerStudentStatus`,
                triggerStatusForm,
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

    const useTriggerStudentStatus = () => {

        return useMutation(postTriggerStudentStatus, {
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







// get course counts
// /Course/GetCourseCounts 
    const getCourseCounts = async (isForClub) => {
        const token = Cookies.get('token');

        try {
            const response = await axios.get(`${API_BASE_URL}/Course/GetCourseCounts?isForClub=${isForClub || false}`, {
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

    const useCourseCounts = (isForClub) => {
        return useQuery(['courseCounts', isForClub], () => getCourseCounts(isForClub));
    }


    







// get a course student
// /Course/GetCourseStudent?userCourseId=35
    const getACourseStudent = async (userCourseId, isForClub) => {
        const token = Cookies.get('token');

        try {
            const response = await axios.get(`${API_BASE_URL}/Course/GetCourseStudent?userCourseId=${userCourseId}&isForClub=${isForClub}`, {
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
    
    const useACourseStudent = (userCourseId, isForClub) => {
        return useQuery(['aCourseStudent', userCourseId, isForClub], () => getACourseStudent(userCourseId, isForClub));
    };









// get course student flights
// /Course/GetStudentFlights?userCourseId=35&pageNumber=1&pageSize=2
    const GetStudentPracticalActivities = async (userCourseId, pageNumber, pageSize, isForClub) => {
        const token = Cookies.get('token');

        try {
            const response = await axios.get(`${API_BASE_URL}/Course/GetStudentPracticalActivities?userCourseId=${userCourseId}&pageNumber=${pageNumber}&pageSize=${pageSize}&isForClub=${isForClub}`, {
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

    const useStudentPracticalActivities = (userCourseId, pageNumber, pageSize, isForClub) => {
        return useQuery(['studentPracticalActivities', userCourseId, pageNumber, pageSize, isForClub], () => GetStudentPracticalActivities(userCourseId, pageNumber, pageSize, isForClub));
    }







// get student flight
// /Course/GetStudentFlight?flightId=25
    const GetStudentPracticalActivity = async (flightId, isForClub) => {
        const token = Cookies.get('token');

        try {
            const response = await axios.get(`${API_BASE_URL}/Course/GetStudentPracticalActivity?practicalActivityId=${flightId}&isForClub=${isForClub}`, {
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

    const useStudentPracticalActivity = (flightId, isForClub) => {
        return useQuery(['courseStudentFlight', flightId, isForClub], () => GetStudentPracticalActivity(flightId, isForClub));
    }





// get course student classes
// /Course/GetStudentClasses?userCourseId=35
    const getCourseStudentClasses = async (userCourseId, isForClub) => {
        const token = Cookies.get('token');

        try {
            const response = await axios.get(`${API_BASE_URL}/Course/GetStudentClasses?userCourseId=${userCourseId}&isForClub=${isForClub}`, {
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

    const useCourseStudentClasses = (userCourseId ,isForClub) => {
        return useQuery(['courseStudentClasses', userCourseId ,isForClub], () => getCourseStudentClasses(userCourseId, isForClub));
    }









// get course student class
// /Course/GetStudentClass?classId=1
    const getCourseStudentClass = async (classId) => {
        const token = Cookies.get('token');

        try {
            const response = await axios.get(`${API_BASE_URL}/Course/GetStudentClass?classId=${classId}`, {
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

    const useCourseStudentClass = (classId) => {
        return useQuery(['courseStudentClass', classId], () => getCourseStudentClass(classId));
    }









// get student syllabi
// /Course/GetStudentSyllabi?userCourseId=35
    const getStudentSyllabi = async (userCourseId, isForClub) => {
        const token = Cookies.get('token');

        try {
            const response = await axios.get(`${API_BASE_URL}/Course/GetStudentSyllabi?userCourseId=${userCourseId}&isForClub=${isForClub}`, {
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
    
    const useGetStudentSyllabi = (userCourseId, isForClub) => {
        return useQuery(['studentSyllabi', userCourseId, isForClub], () => getStudentSyllabi(userCourseId, isForClub));
    };



    // /api/Course/GetStudentPendingFlightCounts?userCourseId=45
    const getStudentPendingFlightCounts = async (userCourseId) => {
                    
        const token = Cookies.get('token');

        try {
        const response = await axios.get(`${API_BASE_URL}/Course/GetStudentPendingFlightCounts?${userCourseId && `userCourseId=${userCourseId}&`} `, {
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

    const useStudentPendingFlightCounts = (userCourseId) => {
        return useQuery(['getStudentPendingFlightCounts', userCourseId], () =>  getStudentPendingFlightCounts(userCourseId));
    }







// get all active students
// /Course/GetAllActiveStudents?courseId=30
    const getAllActiveStudents = async (courseId) => {
        const token = Cookies.get('token');

        try {
            const response = await axios.get(`${API_BASE_URL}/Course/GetAllActiveStudents?courseId=${courseId}`, {
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

    const useAllActiveStudents = (courseId) => {
        return useQuery(['allActiveStudents', courseId], () => getAllActiveStudents(courseId));
    };





// Get Syllabus Landing Content
// /api/Syllabus/GetSyllabusLandingContent?levelId=3 
    const getSyllabusLandingContent = async (levelId) => {
        const token = Cookies.get('token');

        try {
            const response = await axios.get(`${API_BASE_URL}/Syllabus/GetSyllabusLandingContent?levelId=${levelId}`, {
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

    const useSyllabusLandingContent = (levelId) => {
        return useQuery(['syllabusLandingContent', levelId], () => getSyllabusLandingContent(levelId));
    }









// use all students query
// /Course/GetAllStudents?type=active
    const getAllStudents = async (type, pageNumber, pageSize, isForClub) => {
        const token = Cookies.get('token');

        try {
            const response = await axios.get(`${API_BASE_URL}/Course/GetAllStudents?type=${type}${pageNumber && `&pageNumber=${pageNumber}`}&pageSize=${pageSize}&isForClub=${isForClub || false}`, {
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

    const useAllStudents = (type, pageNumber, pageSize, isForClub) => {
        return useQuery(['allStudents', type, pageNumber, pageSize, isForClub], () => getAllStudents(type, pageNumber, pageSize, isForClub));
    }   






// get student courses
// /Course/GetStudentCourses?studentUserId=890soq
    const GetStudentCourses = async (id, pageNumber, pageSize, isForClub) => {
        const token = Cookies.get('token');

        try {
            const response = await axios.get(`${API_BASE_URL}/Course/GetStudentCourses?studentUserId=${id}&pageNumber=${pageNumber}&pageSize=${pageSize}&isForClub=${isForClub}`, {
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

    const useAStudentCourses = (id, pageNumber, pageSize, isForClub) => {
        return useQuery(['AStudentCourses', id, isForClub], () => GetStudentCourses(id, pageNumber, pageSize, isForClub));
    } 







    


    

export { useAddRegularCourse, useSyllabiForLevels, useAddRetrainingCourse, useAddCustomCourse, useCourseDividers, useCourses, useTriggerCourseStatus ,useACourse, useACourseStudents, useACourseHistoryStudents , useAddStudentToCourse, useACourseSyllabi, useACourseClasses, useAllActiveCourseStudents, useAddCourseClass , useAClass, useUserCourseFlight , useDeclineUserFlight , useAcceptUserFlight, useTriggerClubStatus , useTriggerStudentStatus, useCourseCounts, useACourseStudent, useStudentPracticalActivities, useStudentPracticalActivity, useCourseStudentClasses, useCourseStudentClass, useGetStudentSyllabi, useStudentPendingFlightCounts, useAllActiveStudents, useSyllabusLandingContent, useAllStudents, useAStudentCourses };