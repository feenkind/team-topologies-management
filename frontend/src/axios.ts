import axios from 'axios';
import { LOCAL_PASSWORD, LOCAL_USERNAME } from './constants/basicAuth';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL || '',
});

axiosInstance.defaults.auth = {
  username: localStorage.getItem(LOCAL_USERNAME) || '',
  password: localStorage.getItem(LOCAL_PASSWORD) || '',
};

export default axiosInstance;
