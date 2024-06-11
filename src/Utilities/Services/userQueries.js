import { useQuery } from "@tanstack/react-query";
import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = 'https://api.par-baz.ir/api'



// get userData query
const fetchUserData = async () => {
    const token = Cookies.get('token');
    const response = await axios.get(`${BASE_URL}/User/GetUser`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  };

  const useUserData = () => {
      return useQuery(['userData'], fetchUserData);
  }




export {useUserData};