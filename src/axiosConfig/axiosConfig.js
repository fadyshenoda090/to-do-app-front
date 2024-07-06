import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://todo-app-backend-pink.vercel.app/'
});

export default axiosInstance;
