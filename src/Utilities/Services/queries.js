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
  const fetchBlogById = async (blogId) => {
    try {
      const response = await axios.get(`https://api.par-baz.ir/api/Blog/GetBlog?blogId=${blogId}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch blog');
    }
  };

  // use data
  const useBlog = (blogId) => {
    return useQuery(['blog', blogId], () => fetchBlogById(blogId));
  };

  

export { useUserDetails, useLandingPage, addGeneralComment, useBlogs, useBlog };