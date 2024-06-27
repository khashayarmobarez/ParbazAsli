import { useMutation, useQuery } from "@tanstack/react-query";
import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = 'https://api.par-baz.ir/api'


// add course query https://api.par-baz.ir/api/Course/AddRegularCourse
    const addRegularCourse = async (course) => {
        const token = Cookies.get('token');
        const response = await axios.post(`${BASE_URL}/Course/AddRegularCourse`, course, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
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



export { useAddRegularCourse };