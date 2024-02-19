import { useQuery } from "@tanstack/react-query";
import axios from 'axios';

const useUserDetails = () => {
    return useQuery(['user'], () => axios.get(`https://jsonplaceholder.typicode.com/photos/5`));
};

export { useUserDetails };