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

const postIsUserAuthenticated = async (token, dispatch, navigate, isUserAuthenticated) => {
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
        dispatch(updateIsUserAuthenticated('authenticated'));

      } else {
        console.error('is not authenticated');
        // Handle failure case
      }
    } catch (err) {
      console.error('Error case:', err);
  
      if (err.response) {
        const { ErrorMessages } = err.response.data;
  
        if (ErrorMessages && ErrorMessages.length > 0) {
          const errorKey = ErrorMessages[0].ErrorKey;
  
          switch (errorKey) {

            case 'login':
              console.log('Token invalid');
              Cookies.remove('token');
              dispatch(updateIsUserAuthenticated(false));
              navigate('/signUpLogin');
              postLogout(token); // Ensure postLogout is defined
              console.log(isUserAuthenticated)
              break;

            case 'email':
              console.log('ایمیل خود را وارد کنید.');
              dispatch(updateIsUserAuthenticated('noEmail'));
              console.log(isUserAuthenticated)
              break;

            case 'certificate':
              console.log('Certificate must be added');
              dispatch(updateIsUserAuthenticated('noCertificate'));
              console.log(isUserAuthenticated)
              break;

            case 'adminPending':
              console.log('Wait for admins to approve your account');
              dispatch(updateIsUserAuthenticated('noAdminApprovment'));
              console.log(isUserAuthenticated)
              break;

            default:
              console.error('Unknown error key:', errorKey);
          }
  
          console.log('Error key:', errorKey);
        } else {
          console.error('Unexpected error response format:', err.response);
        }
      } else {
        console.error('Request error:', err.message);
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