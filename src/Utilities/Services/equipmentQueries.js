import { useMutation, useQuery } from "@tanstack/react-query";
import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = 'https://api.par-baz.ir/api'


// post equipment
    const addEquipment = async (formData) => {
        const token = Cookies.get('token');
        const response = await axios.post(`${BASE_URL}/Equipment/AddEquipment`, formData, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
        },
        });
    
        if (response.status !== 200) {
        throw new Error('Failed to add equipment');
        }
    
        return response.data;
    };
    
    const useAddEquipment = () => {
        return useMutation(addEquipment, {
        onSuccess: (data) => {
            // Handle success, e.g., show a notification, reset the form, etc.
            console.log('Equipment added successfully:', data);
            // You can add additional logic here, such as navigating to another page or updating the UI
        },
        onError: (error) => {
            // Handle error, e.g., show an error message
            console.error('Error adding equipment:', error);
            // You can handle the error in a way that suits your application
        },
        });
    };



export { useAddEquipment };