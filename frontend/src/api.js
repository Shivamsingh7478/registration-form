import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance with default configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

// Request interceptor for logging and auth headers
api.interceptors.request.use(
  (config) => {
    console.log('\n📤 Request Details:');
    console.log('URL:', config.url);
    console.log('Method:', config.method?.toUpperCase());
    console.log('Headers:', config.headers);
    console.log('Data:', config.data);
    console.log('WithCredentials:', config.withCredentials);
    console.log('Origin:', window.location.origin);
    
    // Add authorization header if token exists
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for logging and error handling
api.interceptors.response.use(
  (response) => {
    console.log('\n📥 Response Details:');
    console.log('Status:', response.status);
    console.log('Headers:', response.headers);
    console.log('Data:', response.data);
    return response;
  },
  (error) => {
    console.error('\n❌ Response Error:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Headers:', error.response.headers);
      console.error('Data:', error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error message:', error.message);
    }
    return Promise.reject(error);
  }
);

// API endpoints with enhanced error handling
export const createPersonalDetails = async (data) => {
  try {
    const response = await api.post('/personal/create', data);
    return response.data;
  } catch (error) {
    console.error('Personal details creation error:', error);
    throw new Error(error.response?.data?.message || 'Failed to create personal details');
  }
};

export const createContactDetails = async (data) => {
  try {
    const response = await api.post('/contact/create', data);
    return response.data;
  } catch (error) {
    console.error('Contact details creation error:', error);
    throw new Error(error.response?.data?.message || 'Failed to create contact details');
  }
};

export const createEducationalDetails = async (data) => {
  try {
    const response = await api.post('/education/create', data);
    return response.data;
  } catch (error) {
    console.error('Educational details creation error:', error);
    throw new Error(error.response?.data?.message || 'Failed to create educational details');
  }
};

export const createWorkExperience = async (data) => {
  try {
    const response = await api.post('/work/create', data);
    return response.data;
  } catch (error) {
    console.error('Work experience creation error:', error);
    throw new Error(error.response?.data?.message || 'Failed to create work experience');
  }
};

// Add a generic error handler
export const handleApiError = (error) => {
  const errorMessage = error.response?.data?.message || 
                      error.message || 
                      'An unknown error occurred';
  console.error('API Error:', errorMessage);
  throw errorMessage;
};

// Add a health check function
export const checkApiHealth = async () => {
  try {
    const response = await api.get('/health');
    return response.data;
  } catch (error) {
    console.error('Health check error:', error);
    throw new Error('API health check failed');
  }
};

export default api;