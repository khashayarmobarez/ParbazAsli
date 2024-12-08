import { useMutation, useQuery } from "@tanstack/react-query";
import axios from 'axios';
import Cookies from 'js-cookie';
import { API_BASE_URL } from "../Providers/apiUrl";


// axios instance
// import axiosInstance from "./axiosConfig";



// Get blogs query with pagination
    // fetch blogs
    const fetchBlogs = async ({ queryKey }) => {
      const [, { pageSize, pageNumber }] = queryKey;
      const response = await axios.get(`${API_BASE_URL}/Blog/GetBlogs`, {
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
        const response = await axios.get(`${API_BASE_URL}/Blog/GetBlog?Id=${blogId}`);
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
      const response = await axios.get(`${API_BASE_URL}/Organization/GetAllOrganizations`, {
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




// Get Levels for adding course(without starter role) By Organization Id
  const getOrganizationLevelsForCourse = async (organId) => {
    try {
      const token = Cookies.get('token');
      const response = await axios.get(`${API_BASE_URL}/Level/GetNoneStarterLevels?organizationId=${organId}`, {
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
  const useOrganLevelsForCourse = (organId) => {
    return useQuery(['organLevelsForCourses', organId], () => getOrganizationLevelsForCourse(organId), {
        enabled: !!organId, // This ensures the query runs only if organId is not null/undefined
    });
  };



// post certificate
  const addCertificate = async (formData) => {
    const token = Cookies.get('token');
    const response = await axios.post(`${API_BASE_URL}/Certificate/AddCertificate`, formData, {
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
    return useMutation(addCertificate);
  };





// get users names by id
  const getUserById = async (userId) => {
    if(userId.length > 5) {
      try {
        const token = Cookies.get('token');
        const response = await axios.get(`${API_BASE_URL}/User/GetAnotherUser?userId=${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
        // console.log(response.data);  
        return response.data;
      } catch (error) {
        if (error.response.data.ErrorMessages[0].ErrorKey === 'login') {
            window.location.reload();
        } else {
            throw error;
        }
      }
    } 
  };


  const useUserById = (userId) => {
    return useQuery(['userById', userId], () => getUserById(userId), {
        enabled: !!userId, // This ensures the query runs only if organId is not null/undefined
    });
  };



// get another user for adding level
const getUserLevelById = async (userId,levelId, classTypeId, setErrorMessage) => {
    try {
      const token = Cookies.get('token');
      const response = await axios.get(`${API_BASE_URL}/User/GetAnotherUserForAddingCourse?userId=${userId}&levelId=${levelId}&courseType=${classTypeId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
      // console.log(response.data);  
      return response.data;
    } catch (error) {
      if (error.response.data.ErrorMessages[0].ErrorKey === 'login') {
          window.location.reload();
      } else {
          throw error;
      }
    }
};

const useUserLevelById = (userId,levelId,classTypeId, setErrorMessage) => {
  return useQuery(['userLevelById', userId,levelId,classTypeId,setErrorMessage], () => getUserLevelById(userId,levelId,classTypeId,setErrorMessage), {
      enabled: !!userId, // This ensures the query runs only if userId is not null/undefined 
  });
};





// get level by organization id
// /api/Level/GetLevelsByOrganizationId 
  const getLevelsByOrganizationId = async (organId) => {
    try {
      const token = Cookies.get('token');
      const response = await axios.get(`${API_BASE_URL}/Level/GetLevels?organizationId=${organId}`, {
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
  }

  const useLevelsByOrganizationId = (organId) => {
    return useQuery(['levelsByOrganizationId', organId], () => getLevelsByOrganizationId(organId), {
        enabled: !!organId, // This ensures the query runs only if organId is not null/undefined
    });
  }






  

export { useBlogs, useBlog, useOrgansData, useOrganLevelsForCourse, useAddCertificate, useUserById, useUserLevelById, useLevelsByOrganizationId};