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





// get all Equipment from one type
    const getUserEquipmentsByType = async (equipmentType) => {
        try {
            const token = Cookies.get('token');
            const response = await axios.get(`${BASE_URL}/Equipment/GetActiveEquipments?type=${equipmentType}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            });
            // console.log(response.data);  
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch equipments');
        }
    };


    const useUserEquipments = (equipmentType) => {
        return useQuery(['userEquipments', equipmentType], () => getUserEquipmentsByType(equipmentType));
    };





// get an Equipment data
    const getAnEquipmentData = async (equipmentId) => {
        try {
            const token = Cookies.get('token');
            const response = await axios.get(`${BASE_URL}/Equipment/GetEquipment?equipmentId=${equipmentId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            });
            // console.log(response.data);  
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch the equipment data');
        }
    };


    const useAnEquipment = (equipmentId) => {
        return useQuery(['anEquipment', equipmentId], () => getAnEquipmentData(equipmentId), {
            enabled: !!equipmentId, // only run query if equipmentId is defined
        });
    };



export { useAddEquipment, useUserEquipments, useAnEquipment };