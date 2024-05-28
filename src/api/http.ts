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
    const accessToken = await retrieve('acessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  e => {
    return Promise.reject(e);
  },
);

export default http;
