import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000'; // Replace with your Flask app's URL

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});