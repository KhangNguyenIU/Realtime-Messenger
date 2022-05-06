import axios from 'axios';

const token = localStorage.getItem('token');

const URL = process.env.REACT_APP_API_URL;

const axiosClient = axios.create({
  baseURL: URL,
  headers: {
    Accept: '*/*',
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
});

export default axiosClient;
