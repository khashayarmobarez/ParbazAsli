import axios from 'axios';
import axiosInstance from './axiosConfig';

const BASE_URL = 'https://api.par-baz.ir/api'

const fetchAuthSettings = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/Auth/GetAuthenticationSettings`);
        return response.data.data;
        } catch (error) {
        console.error('Failed to fetch authentication settings:', error);
        throw error;
        }
};


const postLogout = async (token) => {
    try {
      const response = await axios.post(
        'https://api.par-baz.ir/api/Auth/Logout',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.data.isSuccess) {
        console.log('Logout successful');
        // Handle additional logout logic if needed
      } else {
        console.error('Logout failed');
        // Handle failure case
      }
    } catch (error) {
      console.error('An error occurred during logout:', error);
      // Handle error case
    }
  };


export {fetchAuthSettings, postLogout};