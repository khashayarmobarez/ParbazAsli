import { useQuery } from "@tanstack/react-query";
import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com/photos'

const useUserDetails = () => {
    return useQuery(['user'], () => axios.get(`${BASE_URL}/5`));
};

export { useUserDetails };