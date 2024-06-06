import axios from 'axios';
import Cookies from 'js-cookie';

// redux
import { updateIsUserAuthenticated } from '../ReduxToolKit/features/userData/userSlice';


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

const postIsUserAuthenticated = async (token, dispatch, navigate) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/Auth/IsUserAuthenticated`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.data.isSuccess) {
        
        console.log('user is fully authenticated');

        // handling level of users authentication
        dispatch(updateIsUserAuthenticated(true));

      } else {
        console.error('is not authenticated');
        // Handle failure case
      }
    } catch (err) {
      console.error('errorCase:',err);
      // Handle error case
      if (err.response.ErrorMessages[0].ErrorKey === 'login') {
        console.log('token invalid')
        console.log(err.response.ErrorMessages[0].ErrorKey)
        Cookies.remove('token');
        navigate('/signUpLogin');
        postLogout(token)
      }
      else if (err.response.ErrorMessages[0].ErrorKey === 'email') {
        console.log('email must be added')
        console.log(err.response.ErrorMessages[0].ErrorKey)
      }
      else if (err.response.ErrorMessages[0].ErrorKey === 'certificate') {
        console.log('certificate must be added')
        console.log(err.response.ErrorMessages[0].ErrorKey)
      }
      else if (err.response.ErrorMessages[0].ErrorKey === 'adminPending') {
        console.log('wait for admins to approve your account')
        console.log(err.response.ErrorMessages[0].ErrorKey)
      }
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


export { fetchAuthSettings, postLogout, postIsUserAuthenticated };