import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL || '',
});

axiosInstance.defaults.auth = {
  username: process.env.REACT_APP_HTTP_BASIC_AUTH_USER || '',
  password: process.env.REACT_APP_HTTP_BASIC_AUTH_PASS || '',
};

export default axiosInstance;
