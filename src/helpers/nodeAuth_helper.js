import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; 
import API_CONFIG, { getNodeServerUrl, getAuthHeaders } from '../config/api.config';

// Create axios instance for Node Server
const nodeApi = axios.create({
  baseURL: API_CONFIG.NODE_SERVER.API_BASE_URL,
  timeout: API_CONFIG.NODE_SERVER.TIMEOUT,
});

// Add request interceptor to include auth token
nodeApi.interceptors.request.use(
  (config) => {
    const authUser = localStorage.getItem(API_CONFIG.AUTH.TOKEN_KEY);
    console.log("Auth : ",authUser)
    if (authUser) {
      const decoded = jwtDecode(authUser);
      console.log("Decoded user:", decoded);

      // If you need to check expiration manually (optional)
      const isExpired = decoded.exp && Date.now() >= decoded.exp * 1000;
      if (!isExpired) {
        config.headers.Authorization = `${API_CONFIG.AUTH.TOKEN_PREFIX} ${authUser}`;
      } else {
        console.warn("Token expired");
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle auth errors
nodeApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expired or invalid, redirect to login
      localStorage.removeItem(API_CONFIG.AUTH.TOKEN_KEY);
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Authentication functions
export const loginToNodeServer = async (username, password) => {
  try {
    const response = await nodeApi.post(API_CONFIG.AUTH.LOGIN_ENDPOINT, { "usernameOrEmail":username, password });
    console.log("Login response:", response);
    const {user,token} = response.data;
    localStorage.setItem(API_CONFIG.AUTH.TOKEN_KEY, token);
    return user
  } catch (error) {
    throw error.message || 'Login failed';
  }
};

export const registerToNodeServer = async (username, password,email) => {
  try {
    const response = await nodeApi.post(API_CONFIG.AUTH.REGISTER_ENDPOINT, { username, password,email });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Registration failed';
  }
};

// Product API functions
export const getProducts = async () => {
  try {
    const response = await nodeApi.get(API_CONFIG.ENDPOINTS.PRODUCTS.GET_ALL);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to fetch products';
  }
};

export const getProductById = async (id) => {
  try {
    const response = await nodeApi.get(API_CONFIG.ENDPOINTS.PRODUCTS.GET_BY_ID(id));
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to fetch product';
  }
};

export const createProduct = async (productData) => {
  try {
    const response = await nodeApi.post(API_CONFIG.ENDPOINTS.PRODUCTS.CREATE, productData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to create product';
  }
};

export const updateProduct = async (id, productData) => {
  try {
    const response = await nodeApi.put(API_CONFIG.ENDPOINTS.PRODUCTS.UPDATE(id), productData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to update product';
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await nodeApi.delete(API_CONFIG.ENDPOINTS.PRODUCTS.DELETE(id));
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to delete product';
  }
};

// Category API functions
export const getCategories = async () => {
  try {
    const response = await nodeApi.get(API_CONFIG.ENDPOINTS.CATEGORIES.GET_ALL);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to fetch categories';
  }
};

export const getCategoryById = async (id) => {
  try {
    const response = await nodeApi.get(API_CONFIG.ENDPOINTS.CATEGORIES.GET_BY_ID(id));
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to fetch category';
  }
};

export const createCategory = async (categoryData) => {
  try {
    const response = await nodeApi.post(API_CONFIG.ENDPOINTS.CATEGORIES.CREATE, categoryData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to create category';
  }
};

export const updateCategory = async (id, categoryData) => {
  try {
    const response = await nodeApi.put(API_CONFIG.ENDPOINTS.CATEGORIES.UPDATE(id), categoryData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to update category';
  }
};

export const deleteCategory = async (id) => {
  try {
    const response = await nodeApi.delete(API_CONFIG.ENDPOINTS.CATEGORIES.DELETE(id));
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to delete category';
  }
};

// Order API functions
export const getOrders = async () => {
  try {
    const response = await nodeApi.get(API_CONFIG.ENDPOINTS.ORDERS.GET_ALL);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to fetch orders';
  }
};

// User API functions
export const getUsers = async () => {
  try {
    const response = await nodeApi.get(API_CONFIG.ENDPOINTS.USERS.GET_ALL);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to fetch users';
  }
};

// Dashboard API functions
export const getDashboardStats = async () => {
  try {
    const response = await nodeApi.get(API_CONFIG.ENDPOINTS.DASHBOARD.STATS);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to fetch dashboard stats';
  }
};

// Email API functions
export const sendEmail = async (emailData) => {
  try {
    const response = await nodeApi.post(API_CONFIG.ENDPOINTS.EMAIL.SEND, emailData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to send email';
  }
};

export const sendEmailToSelf = async (emailData) => {
  try {
    const response = await nodeApi.post(API_CONFIG.ENDPOINTS.EMAIL.SEND_TO_SELF, emailData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to send email to self';
  }
};

// Gmail API functions
export const getGmailEmails = async () => {
  try {
    const response = await nodeApi.get(API_CONFIG.ENDPOINTS.GMAIL.GET_EMAILS);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to fetch Gmail emails';
  }
};

export const getGmailEmailById = async (id) => {
  try {
    const response = await nodeApi.get(API_CONFIG.ENDPOINTS.GMAIL.GET_EMAIL_BY_ID(id));
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to fetch Gmail email';
  }
};

export const searchGmailEmails = async (query) => {
  try {
    const response = await nodeApi.get(API_CONFIG.ENDPOINTS.GMAIL.SEARCH_EMAILS, {
      params: { q: query }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to search Gmail emails';
  }
};

export const getGmailLabels = async () => {
  try {
    const response = await nodeApi.get(API_CONFIG.ENDPOINTS.GMAIL.GET_LABELS);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to fetch Gmail labels';
  }
};

export default nodeApi; 