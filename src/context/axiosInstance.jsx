import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://techtest.youapp.ai', // Ganti dengan URL API Anda
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
