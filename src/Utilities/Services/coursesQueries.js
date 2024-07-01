import { useMutation, useQuery } from "@tanstack/react-query";
import axios from 'axios';
import Cookies from 'js-cookie';

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
            }
        }

    };

    const useCourseDividers = () => {
        return useQuery(['courseDividers'], getCourseDividers);
    }



export { useAddRegularCourse, useSyllabiForLevels, useAddRetrainingCourse, useAddCustomCourse, useCourseDividers };