import { getEnvironmentConfig } from './environment';

// Get environment-specific configuration
const envConfig = getEnvironmentConfig();

// API Configuration for React Admin
const API_CONFIG = {
  // Node Server Configuration - Now dynamic based on environment
  NODE_SERVER: {
    BASE_URL: envConfig.NODE_SERVER.BASE_URL,
    API_BASE_URL: envConfig.NODE_SERVER.API_BASE_URL,
    TIMEOUT: 30000, // 30 seconds
  },
  
  // Authentication Configuration
  AUTH: {
    TOKEN_KEY: 'authUser',
    TOKEN_PREFIX: 'Bearer',
    LOGIN_ENDPOINT: '/auth/login',
    REGISTER_ENDPOINT: '/auth/register',
  },
  
  // API Endpoints
  ENDPOINTS: {
    // Products
    PRODUCTS: {
      GET_ALL: '/products',
      GET_BY_ID: (id) => `/products/${id}`,
      CREATE: '/products',
      UPDATE: (id) => `/products/${id}`,
      DELETE: (id) => `/products/${id}`,
    },
    
    // Categories
    CATEGORIES: {
      GET_ALL: '/categories',
      GET_BY_ID: (id) => `/categories/${id}`,
      CREATE: '/categories',
      UPDATE: (id) => `/categories/${id}`,
      DELETE: (id) => `/categories/${id}`,
    },
    
    // Orders
    ORDERS: {
      GET_ALL: '/orders',
      GET_BY_ID: (id) => `/orders/${id}`,
      CREATE: '/orders',
      UPDATE: (id) => `/orders/${id}`,
      DELETE: (id) => `/orders/${id}`,
    },
    
    // Users
    USERS: {
      GET_ALL: '/users',
      GET_BY_ID: (id) => `/users/${id}`,
      CREATE: '/users',
      UPDATE: (id) => `/users/${id}`,
      DELETE: (id) => `/users/${id}`,
    },
    
    // Dashboard
    DASHBOARD: {
      STATS: '/dashboard/stats',
      ANALYTICS: '/dashboard/analytics',
    },
    
    // Email
    EMAIL: {
      SEND: '/email/send',
      SEND_TO_SELF: '/email/send-to-self',
    },
    
    // Gmail
    GMAIL: {
      GET_EMAILS: '/gmail/emails',
      GET_EMAIL_BY_ID: (id) => `/gmail/emails/${id}`,
      SEARCH_EMAILS: '/gmail/search',
      GET_LABELS: '/gmail/labels',
      AUTH_URL: '/gmail/auth/url',
    },
  },
  
  // Environment Configuration
  ENV: {
    DEVELOPMENT: process.env.NODE_ENV === 'development',
    PRODUCTION: process.env.NODE_ENV === 'production',
    STAGING: process.env.REACT_APP_ENV === 'staging',
    DEBUG: envConfig.DEBUG,
  },
};

// Helper functions
export const getNodeServerUrl = (endpoint = '') => {
  return `${API_CONFIG.NODE_SERVER.API_BASE_URL}${endpoint}`;
};

export const getAuthToken = () => {
  const authUser = localStorage.getItem(API_CONFIG.AUTH.TOKEN_KEY);
  if (authUser) {
    const user = JSON.parse(authUser);
    return user.accessToken;
  }
  return null;
};

export const getAuthHeaders = () => {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `${API_CONFIG.AUTH.TOKEN_PREFIX} ${token}` }),
  };
};

// Debug logging function
export const debugLog = (message, data = null) => {
  if (API_CONFIG.ENV.DEBUG) {
    console.log(`[API Debug] ${message}`, data);
  }
};

export default API_CONFIG; 