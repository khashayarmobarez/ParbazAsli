import { useMutation, useQuery } from "@tanstack/react-query";
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { API_BASE_URL } from "../Providers/apiUrl";
import { getCommonHeaders } from "../Providers/headers";



// get Syllabi by level id
const getSyllabiForLevels = async (levelId) => {

    try {
        const response = await axios.get(`${API_BASE_URL}/Syllabus/GetSyllabiByLevelId?levelId=${levelId}`, { 
            headers: getCommonHeaders() 
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
        
        const response = await axios.post(`${API_BASE_URL}/Course/AddRegularCourse`, course, { 
            headers: getCommonHeaders() 
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
        
        const response = await axios.post(`${API_BASE_URL}/Course/AddRetrainingCourse`, course, { 
            headers: getCommonHeaders() 
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
        
        const response = await axios.post(`${API_BASE_URL}/Course/AddCustomCourse`, course, { 
            headers: getCommonHeaders() 
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

        try {
        const response = await axios.get(`${API_BASE_URL}/Course/GetCourseDividers?isForClub=${isForClub || false}`, { 
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

    const useCourseDividers = (isForClub) => {
        return useQuery(['courseDividers', isForClub], () => getCourseDividers(isForClub));
    }



// get courses data
    const getCourses = async (type, organizationId, pageNumber, isForClub) => {
        const token = Cookies.get('token');

        try {
            const response = await axios.get(`${API_BASE_URL}/Course/GetCourses`, {
                headers: getCommonHeaders(), // Reusable headers
                params: { // Params specific to this request
                  type,
                  organizationId,
                  pageNumber,
                  isForClub,
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


    const useCourses = (type, organizationId, pageNumber, isForClub) => {
        return useQuery(['courses', type, organizationId, pageNumber, isForClub], () => getCourses(type, organizationId, pageNumber, isForClub));
    };



// post trigger course status
    const postTriggerCourseStatus = async (params) => {

        try {
            const response = await axios.post(
                `${API_BASE_URL}/Course/TriggerCourseStatus`,
                params,
                { 
                    headers: getCommonHeaders() 
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
    const getACourse = async (courseId) => {
        
        try {
            const response = await axios.get(`${API_BASE_URL}/Course/GetCourse?courseId=${courseId}`, { 
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
    
    
    const useACourse = (courseId ) => {
        return useQuery(['aCourse', courseId], () => getACourse(courseId));
    };


    

    
// get a course students data
    const getACourseStudents = async (courseId, pageNumber) => {

        try {
            const response = await axios.get(`${API_BASE_URL}/Course/GetCourseStudents?courseId=${courseId}&pageNumber=${pageNumber}`, { 
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


    const useACourseStudents = (courseId,pageNumber) => {
        return useQuery(['aCourseStudents', courseId], () => getACourseStudents(courseId, pageNumber));
    };




    

    
// get a course old students data
    const getACourseHistoryStudents = async (courseId, pageNumber ) => {

        try {
            const response = await axios.get(`${API_BASE_URL}/Course/GetCourseStudentsHistory?courseId=${courseId}&pageNumber=${pageNumber}`, { 
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


    const useACourseHistoryStudents = (courseId,pageNumber) => {
        return useQuery(['aCourseHistoryStudents', courseId], () => getACourseHistoryStudents(courseId, pageNumber));
    };




// add student to course  /Course/AddStudentToCourse
    const addStudentToCourse = async (student) => {

        try {
            const response = await axios.post(`${API_BASE_URL}/Course/AddStudentToCourse`, student, { 
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

    const useAddStudentToCourse = () => {
        return useMutation(addStudentToCourse, {
            onSuccess: (data) => {
                // Handle success, e.g., show a notification, reset the form, etc.
                console.log('Student added successfully:', data);
            },
        });
    }






// get a course syllabi   /Course/GetCourseSyllabi?courseId=30&type=2
    const getACourseSyllabi = async (courseId, type) => {

        try {
            const response = await axios.get(`${API_BASE_URL}/Course/GetCourseSyllabi?courseId=${courseId}&type=${type}`, { 
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

    const useACourseSyllabi = (courseId, type) => {
        return useQuery(['aCourseSyllabi', courseId, type], () => getACourseSyllabi(courseId, type));
    };





// get course classes Course/GetCourseClasses?courseId=30
    const getACourseClasses = async (courseId) => {

        try {
            const response = await axios.get(`${API_BASE_URL}/Course/GetCourseClasses?courseId=${courseId}`, { 
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

    const useACourseClasses = (courseId) => {
        return useQuery(['aCourseClasses', courseId], () => getACourseClasses(courseId));
    };






// Get All Active Course Students /Course/GetAllActiveCourseStudents?courseId=30
    const getAllActiveCourseStudents = async (courseId) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/Course/GetAllActiveCourseStudents?courseId=${courseId}`, { 
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

    const useAllActiveCourseStudents = (courseId) => {
        return useQuery(['allActiveCourseStudents', courseId], () => getAllActiveCourseStudents(courseId));
    };





// add class to course /Course/AddCourseClass 
    const addCourseClass = async (courseClass) => {

        try {
            const response = await axios.post(`${API_BASE_URL}/Course/AddCourseClass`, courseClass, { 
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

    const useAddCourseClass = () => {
        return useMutation(addCourseClass, {
            onSuccess: (data) => {
                // Handle success, e.g., show a notification, reset the form, etc.
                console.log('Class added successfully:', data);
            },
        });
    }




    

// get a class data /Course/GetCourseClass?classId=1
    const getAClass = async (classId) => {

        try {
            const response = await axios.get(`${API_BASE_URL}/Course/GetCourseClass?classId=${classId}`, { 
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

    const useAClass = (classId) => {
        return useQuery(['aClass', classId], () => getAClass(classId));
    };



    

// get a class data /Course/GetCourseClass?classId=1
    const getUserCourseFlight = async (flightId) => {

        try {
            const response = await axios.get(`${API_BASE_URL}/Course/GetStudentPracticalActivity?practicalActivityId=${flightId}`, { 
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

    const useUserCourseFlight = (flightId) => {
        return useQuery(['aUserCourseFlightData', flightId], () => getUserCourseFlight(flightId));
    };








// decline user flight
    const postDeclineUserFlight = async (flightId) => {

        try {
            const response = await axios.post(`${API_BASE_URL}/Course/RejectStudentFlight?flightId=${flightId}`, {}, { 
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

    const useDeclineUserFlight = (flightId) => {
        return useMutation(postDeclineUserFlight, {
            mutationKey: ['declineUserFlight', flightId],
            enabled: flightId,
        });
    };








// accept user flight
    const postAcceptUserPracticalActivity = async (submitData) => {

        try {
            const response = await axios.post(`${API_BASE_URL}/Course/AcceptStudentPracticalActivity`, submitData, { 
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

    const useAcceptUserPracticalActivity = () => {
        return useMutation(postAcceptUserPracticalActivity);
    }








    
// post trigger accept club
    const postTriggerClubStatus = async (triggerStatusForm) => {

        try {
            const response = await axios.post(
                `${API_BASE_URL}/Course/TriggerCoachClubStatus`,
                triggerStatusForm,
                { 
                    headers: getCommonHeaders() 
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

        try {
            const response = await axios.post(
                `${API_BASE_URL}/Course/TriggerStudentStatus`,
                triggerStatusForm,
                { 
                    headers: getCommonHeaders() 
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

        try {
            const response = await axios.get(`${API_BASE_URL}/Course/GetCourseCounts?isForClub=${isForClub || false}`, { 
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

    const useCourseCounts = (isForClub) => {
        return useQuery(['courseCounts', isForClub], () => getCourseCounts(isForClub));
    }


    







// get a course student
// /Course/GetCourseStudent?userCourseId=35
    const getACourseStudent = async (userCourseId) => {

        try {
            const response = await axios.get(`${API_BASE_URL}/Course/GetCourseStudent?userCourseId=${userCourseId}`, { 
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
    
    const useACourseStudent = (userCourseId) => {
        return useQuery(['aCourseStudent', userCourseId], () => getACourseStudent(userCourseId));
    };









// get course student flights
// /Course/GetStudentFlights?userCourseId=35&pageNumber=1&pageSize=2
    const GetStudentPracticalActivities = async (userCourseId, pageNumber, pageSize) => {

        try {
            const response = await axios.get(`${API_BASE_URL}/Course/GetStudentPracticalActivities?userCourseId=${userCourseId}&pageNumber=${pageNumber}&pageSize=${pageSize}`, { 
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

    const useStudentPracticalActivities = (userCourseId, pageNumber, pageSize) => {
        return useQuery(['studentPracticalActivities', userCourseId, pageNumber, pageSize], () => GetStudentPracticalActivities(userCourseId, pageNumber, pageSize));
    }







// get student flight
// /Course/GetStudentFlight?flightId=25
    const GetStudentPracticalActivity = async (flightId) => {

        try {
            const response = await axios.get(`${API_BASE_URL}/Course/GetStudentPracticalActivity?practicalActivityId=${flightId}`, { 
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

    const useStudentPracticalActivity = (flightId) => {
        return useQuery(['courseStudentFlight', flightId], () => GetStudentPracticalActivity(flightId));
    }





// get course student classes
// /Course/GetStudentClasses?userCourseId=35
    const getCourseStudentClasses = async (userCourseId) => {

        try {
            const response = await axios.get(`${API_BASE_URL}/Course/GetStudentClasses?userCourseId=${userCourseId}`, { 
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

    const useCourseStudentClasses = (userCourseId ) => {
        return useQuery(['courseStudentClasses', userCourseId ], () => getCourseStudentClasses(userCourseId));
    }









// get course student class
// /Course/GetStudentClass?classId=1
    const getCourseStudentClass = async (classId) => {

        try {
            const response = await axios.get(`${API_BASE_URL}/Course/GetStudentClass?classId=${classId}`, { 
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

    const useCourseStudentClass = (classId) => {
        return useQuery(['courseStudentClass', classId], () => getCourseStudentClass(classId));
    }









// get student syllabi
// /Course/GetStudentSyllabi?userCourseId=35
    const getStudentSyllabi = async (userCourseId) => {

        try {
            const response = await axios.get(`${API_BASE_URL}/Course/GetStudentSyllabi?userCourseId=${userCourseId}`, { 
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
    
    const useGetStudentSyllabi = (userCourseId) => {
        return useQuery(['studentSyllabi', userCourseId], () => getStudentSyllabi(userCourseId));
    };



    // /api/Course/GetStudentPendingPracticalActivityCount?userCourseId=45
    const GetStudentPendingPracticalActivityCount = async (userCourseId) => {

        try {
        const response = await axios.get(`${API_BASE_URL}/Course/GetStudentPendingPracticalActivityCount?userCourseId=${userCourseId}`, { 
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

    const useStudentPendingPracticalActivityCount = (userCourseId) => {
        return useQuery(['GetStudentPendingPracticalActivityCount', userCourseId], () =>  GetStudentPendingPracticalActivityCount(userCourseId));
    }







// get all active students
// /Course/GetAllActiveStudents?courseId=30
    const getAllActiveStudents = async (courseId) => {

        try {
            const response = await axios.get(`${API_BASE_URL}/Course/GetAllActiveStudents?courseId=${courseId}`, { 
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

    const useAllActiveStudents = (courseId) => {
        return useQuery(['allActiveStudents', courseId], () => getAllActiveStudents(courseId));
    };





// Get Syllabus Landing Content
// /api/Syllabus/GetSyllabusLandingContent?levelId=3 
    const getSyllabusLandingContent = async (levelId) => {

        try {
            const response = await axios.get(`${API_BASE_URL}/Syllabus/GetSyllabusLandingContent?levelId=${levelId}`, {
                headers: {
                    headers: getCommonHeaders() 
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

        try {
            const response = await axios.get(`${API_BASE_URL}/Course/GetAllStudents?type=${type}${pageNumber && `&pageNumber=${pageNumber}`}&pageSize=${pageSize}&isForClub=${isForClub || false}`, { 
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

    const useAllStudents = (type, pageNumber, pageSize, isForClub) => {
        return useQuery(['allStudents', type, pageNumber, pageSize, isForClub], () => getAllStudents(type, pageNumber, pageSize, isForClub));
    }   






// get student courses
// /Course/GetStudentCourses?studentUserId=890soq
    const GetStudentCourses = async (id, pageNumber, pageSize, isForClub) => {

        try {
            const response = await axios.get(`${API_BASE_URL}/Course/GetStudentCourses?studentUserId=${id}&pageNumber=${pageNumber}&pageSize=${pageSize}&isForClub=${isForClub}`, { 
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

    const useAStudentCourses = (id, pageNumber, pageSize, isForClub) => {
        return useQuery(['AStudentCourses', id, isForClub], () => GetStudentCourses(id, pageNumber, pageSize, isForClub));
    } 







    


    

export { useAddRegularCourse, useSyllabiForLevels, useAddRetrainingCourse, useAddCustomCourse, useCourseDividers, useCourses, useTriggerCourseStatus ,useACourse, useACourseStudents, useACourseHistoryStudents , useAddStudentToCourse, useACourseSyllabi, useACourseClasses, useAllActiveCourseStudents, useAddCourseClass , useAClass, useUserCourseFlight , useDeclineUserFlight , useAcceptUserPracticalActivity, useTriggerClubStatus , useTriggerStudentStatus, useCourseCounts, useACourseStudent, useStudentPracticalActivities, useStudentPracticalActivity, useCourseStudentClasses, useCourseStudentClass, useGetStudentSyllabi, useStudentPendingPracticalActivityCount, useAllActiveStudents, useSyllabusLandingContent, useAllStudents, useAStudentCourses };