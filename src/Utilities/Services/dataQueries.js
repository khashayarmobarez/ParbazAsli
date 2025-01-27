import { useQuery } from "@tanstack/react-query";
import axios from 'axios';
import Cookies from 'js-cookie';
import { API_BASE_URL } from "../Providers/apiUrl";
import { getCommonHeaders } from "../Providers/headers";




// get brandData query
    const getEquipmentBrands = async (equipmentType) => {

        try {
            // the equipment type can be one of the "Parachute," "Wing," or "Harness" values
            const response = await axios.get(`${API_BASE_URL}/Brand/GetAllBrands?equipmentType=${equipmentType}`, { 
                headers: getCommonHeaders() 
            });
            return response.data;
        } catch (error) {
            if (error.response && error.response.data.ErrorMessages[0].ErrorKey === 'login') {
                window.location.reload();
            } else {
                throw new Error('Failed to fetch equipment brands');
            }
        }
    };

    const useEquipmentBrands = (equipmentType) => {
        return useQuery(['equipmentBrands', equipmentType], () => getEquipmentBrands(equipmentType));
    };






// get wing Classes query
    const getWingClasses = async () => {

        try {
        const response = await axios.get(`${API_BASE_URL}/WingClass/GetAllWingClasses`, { 
            headers: getCommonHeaders() 
        });
        return response.data;

        } catch (error) {
            if (error.response.data.ErrorMessages[0].ErrorKey === 'login') {
                window.location.reload();
            }
        }

    };

    const useWingClasses = () => {
        return useQuery(['wingClasses'], getWingClasses);
    }




export { useEquipmentBrands, useWingClasses };