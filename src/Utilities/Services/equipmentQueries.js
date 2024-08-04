import { useMutation, useQuery } from "@tanstack/react-query";
import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = 'https://api.digilogbook.ir/api'


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





// get all active Equipment from one type
    const getUserEquipmentsByType = async (equipmentType, isForClub) => {
        try {
            const token = Cookies.get('token');
            const response = await axios.get(`${BASE_URL}/Equipment/GetActiveEquipments?type=${equipmentType}&isForClub=${isForClub}`, {
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


    const useUserEquipments = (equipmentType, isForClub) => {
        return useQuery(['userEquipments', equipmentType, isForClub], () => getUserEquipmentsByType(equipmentType, isForClub));
    };





// get all active Equipment from one type
    const getUserEquipmentsHistoryByType = async (equipmentType, isForClub) => {
        try {
            const token = Cookies.get('token');
            const response = await axios.get(`${BASE_URL}/Equipment/GetEquipmentHistories?type=${equipmentType}&isForClub=${isForClub}`, {
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


    const useUserEquipmentsHistory = (equipmentType, isForClub) => {
        return useQuery(['userEquipmentsHistory', equipmentType, isForClub], () => getUserEquipmentsHistoryByType(equipmentType, isForClub));
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




// change equipment possession mutation
    const possessionTransition = async (formData) => {
        const token = Cookies.get('token');
        const response = await axios.post(`${BASE_URL}/Equipment/PossessionTransition`, formData, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
        },
        });
    
        if (response.status !== 200) {
        throw new Error('Failed to change possession');
        }
    
        return response.data;
    };

    const usePossessionTransition = () => {
        return useMutation(possessionTransition, {
        onSuccess: (data) => {
            // Handle success, e.g., show a notification, reset the form, etc.
            console.log('Possession transition was successful:', data);
            // You can add additional logic here, such as navigating to another page or updating the UI
        },
        onError: (error) => {
            // Handle error, e.g., show an error message
            console.error('Error changing possession:', error);
            // You can handle the error in a way that suits your application
        },
        });
    };





// return euipment mutation
    const returnEquipment = async (formBody) => {
        const token = Cookies.get('token');
        const response = await axios.post(`${BASE_URL}/Equipment/ReturnEquipment`, formBody, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        });
    
        if (response.status !== 200) {
        throw new Error('Failed to return equipment');
        }
    
        return response.data;
    }

    const useReturnEquipment = () => {
        return useMutation(returnEquipment);
    }





// post Edit Equipments
    const postEditEquipment = async (formData) => {
        const token = Cookies.get('token');
        const response = await axios.post(`${BASE_URL}/Equipment/EditEquipment`, formData, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
        },
        });
    
        if (response.status !== 200) {
        throw new Error('Failed to edit equipment');
        }
    
        return response.data;
    }

    const useEditEquipment = () => {
        return useMutation(postEditEquipment, {
        onSuccess: (data) => {
            // Handle success, e.g., show a notification, reset the form, etc.
            console.log('Equipment edited successfully:', data);
            // You can add additional logic here, such as navigating to another page or updating the UI
        },
        onError: (error) => {
            // Handle error, e.g., show an error message
            console.error('Error editing equipment:', error);
            // You can handle the error in a way that suits your application
        },
        });
    };




export { useAddEquipment, useUserEquipments, useAnEquipment, usePossessionTransition, useEditEquipment, useUserEquipmentsHistory, useReturnEquipment };