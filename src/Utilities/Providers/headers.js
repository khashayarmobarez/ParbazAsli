import Cookies from 'js-cookie';

export const getCommonHeaders = (contentType = 'application/json') => {
  
  const token = Cookies.get('token');
  const culture = Cookies.get('culture') || 'en';

  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': contentType,
    'Accept-Language': culture,
  };
};




// usage

// for application/json
// { headers: getCommonHeaders() }

// for 'multipart/form-data'
// { headers: getCommonHeaders('multipart/form-data') }