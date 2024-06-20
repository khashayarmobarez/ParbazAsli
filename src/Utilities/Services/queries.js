import { useMutation, useQuery } from "@tanstack/react-query";
import axios from 'axios';
import Cookies from 'js-cookie';


// axios instance
// import axiosInstance from "./axiosConfig";


const BASE_Test_URL = 'https://jsonplaceholder.typicode.com/photos'
const BASE_URL = 'https://api.par-baz.ir/api'


// test query
    const useUserDetails = () => {
        return useQuery(['user'], () => axios.get(`${BASE_Test_URL}/5`));
    };




// landing page section query
    // get home sections
    const useLandingPage = () => {
        return useQuery(['landing'], () => axios.get(`${BASE_URL}/Landing/GetHomeSections`));
      };

      // get section
      const useSection = (sectionName) => {
        return useQuery(
          ['section', sectionName],
          () => axios.get(`${BASE_URL}/Landing/GetSection?type=${sectionName}`),
          {
            onSuccess: (data) => {
              console.log('Section data:', data);
            },
            onError: (error) => {
              console.error('Error fetching section:', error);
            },
          }
        );
      };


// post comments and opinion on aboutUs page
    const addGeneralComment = async (commentData) => {
      const response = await axios.post(`${BASE_URL}/GeneralComment/AddGeneralComment`, commentData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    };


// Get blogs query with pagination
    // fetch blogs
    const fetchBlogs = async ({ queryKey }) => {
      const [, { pageSize, pageNumber }] = queryKey;
      const response = await axios.get(`${BASE_URL}/Blog/GetBlogs`, {
          params: {
              pageSize,
              pageNumber,
          },
      });
      return response.data;
    };

    // useBlogs
    const useBlogs = (pageSize, pageNumber) => {
      return useQuery(['blogs', { pageSize, pageNumber }], fetchBlogs, {
          keepPreviousData: true,
      });
    };



// get a blog
    // fetch data
    const getBlogById = async (blogId) => {
      try {
        const response = await axios.get(`${BASE_URL}/Blog/GetBlog?Id=${blogId}`);
        return response.data;
      } catch (error) {
        throw new Error('Failed to fetch blog');
      }
    };

    // use data
    const useBlog = (blogId) => {
      return useQuery(['blog', blogId], () => getBlogById(blogId));
    };




// get all organizations
  const getOrganizationsData = async () => {
    try {
      const token = Cookies.get('token');
      const response = await axios.get(`${BASE_URL}/Organization/GetAllOrganizations`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
      // console.log(response.data);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch organs');
    }
  };

  // use data
  const useOrgansData = () => {
    return useQuery(['organizations'], () => getOrganizationsData());
  };




// Get Levels By Organization Id
  const getOrganizationLevels = async (organId) => {
    try {
      const token = Cookies.get('token');
      const response = await axios.get(`${BASE_URL}/Level/GetLevelsByOrganizationId?organizationId=${organId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
      // console.log(response.data);  
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch organs');
    }
  };

  // use data
  const useOrganLevels = (organId) => {
    return useQuery(['organLevels', organId], () => getOrganizationLevels(organId), {
        enabled: !!organId, // This ensures the query runs only if organId is not null/undefined
    });
  };



// post certificate
  const addCertificate = async (formData) => {
    const token = Cookies.get('token');
    const response = await axios.post(`${BASE_URL}/Certificate/AddCertificate`, formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.status !== 200) {
      throw new Error('Failed to add certificate');
    }

    return response.data;
  };

  const useAddCertificate = () => {
    return useMutation(addCertificate, {
      onSuccess: (data) => {
        // Handle success, e.g., show a notification, reset the form, etc.
        console.log('Certificate added successfully:', data);
        window.location.reload()
      },
      onError: (error) => {
        // Handle error, e.g., show an error message
        console.error('Error adding certificate:', error);
      },
    });
  };





// get users names by id
  const getUserById = async (userId) => {
    try {
      const token = Cookies.get('token');
      const response = await axios.get(`${BASE_URL}/User/GetAnotherUser?userId=${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
      // console.log(response.data);  
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch organs');
    }
  };


  const useUserById = (userId) => {
    return useQuery(['userById', userId], () => getUserById(userId), {
        enabled: !!userId, // This ensures the query runs only if organId is not null/undefined
    });
  };






  

export { useUserDetails , useLandingPage, addGeneralComment, useBlogs, useBlog, useSection, useOrgansData, useOrganLevels, useAddCertificate, useUserById};