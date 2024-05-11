import { useQuery } from "@tanstack/react-query";
import axios from 'axios';


const BASE_Test_URL = 'https://jsonplaceholder.typicode.com/photos'
const BASE_URL = 'http://195.177.255.109/api'

const useUserDetails = () => {
    return useQuery(['user'], () => axios.get(`${BASE_Test_URL}/5`));
};

const useLandingPage = () => {
    return useQuery(['landing'], () => axios.get(`${BASE_URL}/Landing/GetHomeSections`));
  };
  

export { useUserDetails, useLandingPage };