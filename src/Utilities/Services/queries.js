import { useQuery } from "@tanstack/react-query";
import axios from 'axios';


const BASE_Test_URL = 'https://jsonplaceholder.typicode.com/photos'
const BASE_URL = 'https://api.par-baz.ir/api'

// test query
const useUserDetails = () => {
    return useQuery(['user'], () => axios.get(`${BASE_Test_URL}/5`));
};

// landing page section query
const useLandingPage = () => {
    return useQuery(['landing'], () => axios.get(`${BASE_URL}/Landing/GetHomeSections`));
  };


// post comments and opinion / aboutUs page
const addGeneralComment = async (commentData) => {
  const response = await axios.post(`${BASE_URL}/GeneralComment/AddGeneralComment`, commentData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};
  

export { useUserDetails, useLandingPage, addGeneralComment };