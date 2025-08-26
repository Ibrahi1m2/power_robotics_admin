// Environment Configuration
const ENV_CONFIG = {
  // Development Environment
  development: {
    NODE_SERVER: {
      BASE_URL: 'http://localhost:5000',
      API_BASE_URL: 'http://localhost:5000/api',
    },
    DEBUG: true,
  },
  
  // Production Environment
  production: {
    NODE_SERVER: {
      BASE_URL: 'https://your-production-server.com',
      API_BASE_URL: 'https://your-production-server.com/api',
    },
    DEBUG: false,
  },
  
  // Staging Environment
  staging: {
    NODE_SERVER: {
      BASE_URL: 'https://your-staging-server.com',
      API_BASE_URL: 'https://your-staging-server.com/api',
    },
    DEBUG: true,
  },
};

// Get current environment
const getCurrentEnvironment = () => {
  // Check for environment variable first
  if (process.env.REACT_APP_ENV) {
    return process.env.REACT_APP_ENV;
  }
  
  // Fallback to NODE_ENV
  return process.env.NODE_ENV || 'development';
};

// Get configuration for current environment
export const getEnvironmentConfig = () => {
  const env = getCurrentEnvironment();
  return ENV_CONFIG[env] || ENV_CONFIG.development;
};

// Helper function to get Node Server URL
export const getNodeServerUrl = () => {
  const config = getEnvironmentConfig();
  return config.NODE_SERVER.API_BASE_URL;
};

// Helper function to get base URL
export const getBaseUrl = () => {
  const config = getEnvironmentConfig();
  return config.NODE_SERVER.BASE_URL;
};

// Check if debug mode is enabled
export const isDebugMode = () => {
  const config = getEnvironmentConfig();
  return config.DEBUG;
};

export default getEnvironmentConfig; 