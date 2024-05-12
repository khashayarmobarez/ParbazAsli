import { useQuery } from "@tanstack/react-query";
import axios from 'axios';


const BASE_Test_URL = 'https://jsonplaceholder.typicode.com/photos'
const BASE_URL = 'https://api.par-baz.ir/api'

const useUserDetails = () => {
    return useQuery(['user'], () => axios.get(`${BASE_Test_URL}/5`));
};

const useLandingPage = () => {
    return useQuery(['landing'], () => axios.get(`https://api.par-baz.ir/api/Landing/GetHomeSections`));
  };
  

export { useUserDetails, useLandingPage };