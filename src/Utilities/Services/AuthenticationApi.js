import axios from 'axios';
import Cookies from 'js-cookie';
import { useMutation, useQuery } from "@tanstack/react-query";



const BASE_URL = 'https://api.digilogbook.ir/api'



const fetchAuthSettings = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/Auth/GetAuthenticationSettings`);
        return response.data.data;
        } catch (error) {
        console.error('Failed to fetch authentication settings:', error);
        throw error;
        }
};



const postIsUserAuthenticated = async (token, navigate, isUserAuthenticated, setIsPageReloaded) => {
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

      // handling level of users authentication
      Cookies.set('isUserAuthenticated', 'authenticated', { expires: Infinity });

      // Check if page has been reloaded after authentication
      // this function fixed a bug that when user is logged in the components won't rerender until the page is reloaded
      const hasReloaded = sessionStorage.getItem('hasReloaded');
      if (!hasReloaded) {
        setIsPageReloaded(true); // Trigger page reload
        sessionStorage.setItem('hasReloaded', 'true'); // Set flag in sessionStorage
      }

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
            Cookies.set('isUserAuthenticated', false, { expires: Infinity });
            console.log(isUserAuthenticated)
            break;

          case 'email':
            console.log('ایمیل خود را وارد کنید.');
            Cookies.set('isUserAuthenticated', 'noEmail', { expires: Infinity });
            console.log(isUserAuthenticated)
            break;

          case 'certificate':
            console.log('Certificate must be added');
            Cookies.set('isUserAuthenticated', 'noCertificate', { expires: Infinity });
            console.log(isUserAuthenticated)
            break;

          case 'adminPending':
            console.log('Wait for admins to approve your account');
            Cookies.set('isUserAuthenticated', 'noAdminApprovment', { expires: Infinity });
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
      'https://api.digilogbook.ir/api/Auth/Logout',
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







// send verification code
// input = {
//   "username": "09907406599",
//   "type": 1
// }
  const postSendVerificationCode = async (input) => {
    try {
        const response = await axios.post(`${BASE_URL}/Auth/SendVerificationCode`, input, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
            throw error;
    }

  };

  const useSendVerificationCode = () => {
    return useMutation(postSendVerificationCode);
  }





// check cahnge password code validation
// /Auth/CheckForgotPasswordCode
// inpu = {
//     "Username": "09907406599",
//     "Code": "7923"
// }
  const postCheckForgotPasswordCode = async (input) => {
    try {
        const response = await axios.post(`${BASE_URL}/Auth/CheckForgotPasswordCode`, input, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
            throw error;
    }

  };

  const useCheckForgotPasswordCode = () => {
    return useMutation(postCheckForgotPasswordCode);
  }





// reset password
// https://api.digilogbook.ir/api/Auth/ForgotPassword
//   const requestBody = {
//     "username": input,
//     "password": pwd,
//     "confirmPassword": matchPwd,
//     "code": code,
// };
  const postResetPassword = async (input) => {
    try {
        const response = await axios.post(`${BASE_URL}/Auth/ForgotPassword`, input, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }

  };

  const useResetPassword = () => {
    return useMutation(postResetPassword);
  }




export { fetchAuthSettings, postLogout, postIsUserAuthenticated, useSendVerificationCode, useCheckForgotPasswordCode, useResetPassword };