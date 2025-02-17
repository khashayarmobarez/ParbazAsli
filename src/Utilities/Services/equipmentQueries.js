import { useMutation, useQuery } from "@tanstack/react-query";
import axios from 'axios';
import { API_BASE_URL } from "../Providers/apiUrl";
import { getCommonHeaders } from "../Providers/headers";


// post equipment
    const addEquipment = async (formData) => {
        
        const response = await axios.post(`${API_BASE_URL}/Equipment/AddEquipment`, formData, {
            headers: getCommonHeaders('multipart/form-data') 
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
            const response = await axios.get(`${API_BASE_URL}/Equipment/GetActiveEquipments?type=${equipmentType}&isForClub=${isForClub}`, { 
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


    const useUserEquipments = (equipmentType, isForClub) => {
        return useQuery(['userEquipments', equipmentType, isForClub], () => getUserEquipmentsByType(equipmentType, isForClub));
    };




// get active equipments for dropdown input
// /Equipment/GetAllEquipmentsForDropDown?type=3
    const getUserEquipmentsForDropDown = async (equipmentType,wingType) => {

        try {
            const response = await axios.get(`${API_BASE_URL}/Equipment/GetAllEquipmentsForDropDown?type=${equipmentType}${wingType ? `&wingType=${wingType}`: ''}`, { 
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

    const useUserEquipmentsForDropDown = (equipmentType, wingType) => {
        return useQuery(['userEquipmentsForDropDown', equipmentType, wingType], () => getUserEquipmentsForDropDown(equipmentType, wingType));
    };




// get all active Equipment from one type
    const getUserEquipmentsHistoryByType = async (equipmentType, isForClub) => {

        try {
            const response = await axios.get(`${API_BASE_URL}/Equipment/GetEquipmentHistories?type=${equipmentType}&isForClub=${isForClub}`, { 
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


    const useUserEquipmentsHistory = (equipmentType, isForClub) => {
        return useQuery(['userEquipmentsHistory', equipmentType, isForClub], () => getUserEquipmentsHistoryByType(equipmentType, isForClub));
    };





// get an Equipment data
    const getAnEquipmentData = async (equipmentId, isForClub) => {

        try {
            const response = await axios.get(`${API_BASE_URL}/Equipment/GetEquipment?equipmentId=${equipmentId}&isForClub=${isForClub}`, { 
            headers: getCommonHeaders() 
        });
            // console.log(response.data);  
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch the equipment data');
        }
    };


    const useAnEquipment = (equipmentId, isForClub) => {
        return useQuery(['anEquipment', equipmentId, isForClub], () => getAnEquipmentData(equipmentId, isForClub), {
            enabled: !!equipmentId, // only run query if equipmentId is defined
        });
    };




// change equipment possession mutation
    const possessionTransition = async (formData) => {
        
        const response = await axios.post(`${API_BASE_URL}/Equipment/PossessionTransition`, formData, {
            headers: getCommonHeaders('multipart/form-data') 
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
        
        const response = await axios.post(`${API_BASE_URL}/Equipment/ReturnEquipment`, formBody, { 
            headers: getCommonHeaders() 
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
        
        const response = await axios.post(`${API_BASE_URL}/Equipment/EditEquipment`, formData, {
            headers: getCommonHeaders('multipart/form-data') 
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








// trigger equipment status mutation
// /Equipment/TriggerEquipmentStatus
    const triggerEquipmentStatus = async (formData) => {
        
        const response = await axios.post(`${API_BASE_URL}/Equipment/TriggerEquipmentStatus`, formData, { 
            headers: getCommonHeaders() 
        });
    
        if (response.status !== 200) {
        throw new Error('Failed to trigger equipment status');
        }
    
        return response.data;
    };

    const useTriggerEquipmentStatus = () => {
        return useMutation(triggerEquipmentStatus);
    };




export { useAddEquipment, useUserEquipments, useAnEquipment, usePossessionTransition, useEditEquipment, useUserEquipmentsHistory, useReturnEquipment, useTriggerEquipmentStatus, useUserEquipmentsForDropDown };