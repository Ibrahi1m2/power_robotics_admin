import API_CONFIG from './api.config';
import { getEnvironmentConfig } from './environment';

// Main configuration object that combines all configs
const CONFIG = {
  // API Configuration
  api: API_CONFIG,
  
  // Environment Configuration
  env: getEnvironmentConfig(),
  
  // App Configuration
  app: {
    name: 'MarketPro Admin',
    version: '1.0.0',
    description: 'Admin Dashboard for MarketPro',
  },
  
  // Feature Flags
  features: {
    enableDebugMode: API_CONFIG.ENV.DEBUG,
    enableAnalytics: true,
    enableNotifications: true,
  },
};

// Configuration utility functions
export const getConfig = () => CONFIG;

export const getApiConfig = () => CONFIG.api;

export const getEnvConfig = () => CONFIG.env;

export const getAppConfig = () => CONFIG.app;

// Easy access to Node Server URL
export const getBackendUrl = () => CONFIG.api.NODE_SERVER.API_BASE_URL;

export const getBackendBaseUrl = () => CONFIG.api.NODE_SERVER.BASE_URL;

// Easy access to authentication config
export const getAuthConfig = () => CONFIG.api.AUTH;

// Easy access to endpoints
export const getEndpoints = () => CONFIG.api.ENDPOINTS;

// Debug utility
export const debug = (message, data = null) => {
  if (CONFIG.features.enableDebugMode) {
    console.log(`[${CONFIG.app.name}] ${message}`, data);
  }
};

// Configuration validation
export const validateConfig = () => {
  const errors = [];
  
  if (!CONFIG.api.NODE_SERVER.API_BASE_URL) {
    errors.push('Node Server API URL is not configured');
  }
  
  if (!CONFIG.api.AUTH.TOKEN_KEY) {
    errors.push('Authentication token key is not configured');
  }
  
  if (errors.length > 0) {
    console.error('Configuration validation failed:', errors);
    return false;
  }
  
  debug('Configuration validation passed');
  return true;
};

export default CONFIG; 