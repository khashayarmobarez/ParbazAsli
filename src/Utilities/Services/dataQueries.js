import { useQuery } from "@tanstack/react-query";
import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = 'https://api.par-baz.ir/api'


// get brandData query
    const getEquipmentBrands = async (equipmentType) => {
        const token = Cookies.get('token');

        try {
            // the equipment type can be one of the "Parachute," "Wing," or "Harness" values
            const response = await axios.get(`${BASE_URL}/Brand/GetAllBrands?equipmentType=${equipmentType}`, {
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
                throw new Error('Failed to fetch equipment brands');
            }
        }
    };

    const useEquipmentBrands = (equipmentType) => {
        return useQuery(['equipmentBrands', equipmentType], () => getEquipmentBrands(equipmentType));
    };






// get wing Classes query
    const getWingClasses = async () => {

        const token = Cookies.get('token');

        try {
        const response = await axios.get(`${BASE_URL}/WingClass/GetAllWingClasses`, {
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

    const useWingClasses = () => {
        return useQuery(['wingClasses'], getWingClasses);
    }




export { useEquipmentBrands, useWingClasses };