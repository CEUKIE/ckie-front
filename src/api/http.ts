import axios from 'axios';
import {retrieve} from '../utils/persistence';

const http = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

http.interceptors.request.use(
  async config => {
    const token = await retrieve('accessToken');
    console.log('axios: ' + token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  e => {
    return Promise.reject(e);
  },
);

export default http;
