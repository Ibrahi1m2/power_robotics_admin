# React Admin Configuration Guide

This guide explains how to configure the React Admin application to connect to different backend servers.

## 📁 Configuration Files Structure

```
ReactAdmin/src/config/
├── api.config.js          # Main API configuration
├── environment.js         # Environment-specific settings
└── config.js             # Combined configuration utilities
```

## 🔧 Quick Configuration Changes

### 1. Change Backend URL (Development)

Edit `src/config/environment.js`:

```javascript
const ENV_CONFIG = {
  development: {
    NODE_SERVER: {
      BASE_URL: 'http://localhost:5000',        // ← Change this
      API_BASE_URL: 'http://localhost:5000/api', // ← Change this
    },
    DEBUG: true,
  },
  // ... other environments
};
```

### 2. Change Backend URL (Production)

```javascript
const ENV_CONFIG = {
  production: {
    NODE_SERVER: {
      BASE_URL: 'https://your-production-server.com',        // ← Change this
      API_BASE_URL: 'https://your-production-server.com/api', // ← Change this
    },
    DEBUG: false,
  },
  // ... other environments
};
```

### 3. Add New Environment

```javascript
const ENV_CONFIG = {
  // ... existing environments
  testing: {
    NODE_SERVER: {
      BASE_URL: 'https://your-testing-server.com',
      API_BASE_URL: 'https://your-testing-server.com/api',
    },
    DEBUG: true,
  },
};
```

## 🌍 Environment Variables

### Set Environment

```bash
# Development (default)
export NODE_ENV=development

# Production
export NODE_ENV=production

# Staging
export NODE_ENV=staging

# Custom environment
export REACT_APP_ENV=testing
```

### Environment-Specific Configuration

The application automatically detects the environment and uses the appropriate configuration:

- **Development**: `http://localhost:5000`
- **Production**: `https://your-production-server.com`
- **Staging**: `https://your-staging-server.com`

## 🔗 API Endpoints Configuration

All API endpoints are centralized in `src/config/api.config.js`:

```javascript
ENDPOINTS: {
  PRODUCTS: {
    GET_ALL: '/products',
    GET_BY_ID: (id) => `/products/${id}`,
    CREATE: '/products',
    UPDATE: (id) => `/products/${id}`,
    DELETE: (id) => `/products/${id}`,
  },
  // ... other endpoints
}
```

## 🛠️ Using Configuration in Components

### Import Configuration

```javascript
import { getBackendUrl, getAuthConfig, debug } from '../config/config';
import API_CONFIG from '../config/api.config';
```

### Use in API Calls

```javascript
// Get backend URL
const apiUrl = getBackendUrl();

// Get authentication headers
const headers = getAuthHeaders();

// Debug logging
debug('API call made', { url: apiUrl, data });
```

## 🔍 Configuration Manager Component

In development mode, you can use the built-in Configuration Manager:

```javascript
import ConfigManager from '../components/ConfigManager';

// Add to your component
<ConfigManager />
```

This component allows you to:
- View current configuration
- Test backend connection
- Temporarily modify URLs (for testing)

## 🚀 Deployment Configuration

### Production Build

```bash
# Set production environment
export NODE_ENV=production

# Build the application
npm run build
```

### Environment-Specific Builds

```bash
# Development build
NODE_ENV=development npm run build

# Staging build
NODE_ENV=staging npm run build

# Production build
NODE_ENV=production npm run build
```

## 🔐 Authentication Configuration

Authentication settings are in `src/config/api.config.js`:

```javascript
AUTH: {
  TOKEN_KEY: 'authUser',           // localStorage key
  TOKEN_PREFIX: 'Bearer',          // Authorization header prefix
  LOGIN_ENDPOINT: '/auth/login',   // Login endpoint
  REGISTER_ENDPOINT: '/auth/register', // Register endpoint
}
```

## 🐛 Debug Mode

Debug mode is automatically enabled in development and can be controlled:

```javascript
// In environment.js
DEBUG: true,  // Enable debug logging

// In components
debug('Debug message', data);
```

## 📋 Configuration Validation

The application validates configuration on startup:

```javascript
import { validateConfig } from '../config/config';

// Validate configuration
if (!validateConfig()) {
  console.error('Configuration validation failed');
}
```

## 🔄 Updating Multiple Components

When you change the backend URL, all components automatically use the new configuration because they import from the centralized config files.

### Components Using Configuration:

1. **Products Component** (`src/pages/Products/index.js`)
2. **API Helper** (`src/helpers/api_helper.js`)
3. **Node Auth Helper** (`src/helpers/nodeAuth_helper.js`)
4. **Configuration Manager** (`src/components/ConfigManager/ConfigManager.jsx`)

## 🧪 Testing Configuration

Use the test script to verify your configuration:

```bash
# Test current configuration
node test-connection.js

# Test specific environment
NODE_ENV=production node test-connection.js
```

## 📝 Configuration Best Practices

1. **Never hardcode URLs** in components
2. **Use environment variables** for sensitive data
3. **Validate configuration** on startup
4. **Use debug logging** in development
5. **Test configuration** before deployment

## 🔧 Troubleshooting

### Common Issues

1. **404 Errors**: Check if backend URL is correct
2. **CORS Errors**: Ensure backend allows requests from frontend domain
3. **Authentication Errors**: Verify token configuration
4. **Environment Issues**: Check NODE_ENV variable

### Debug Steps

1. Check current configuration in browser console
2. Use Configuration Manager component
3. Run test connection script
4. Verify environment variables

## 📚 Additional Resources

- [API Configuration](./src/config/api.config.js)
- [Environment Configuration](./src/config/environment.js)
- [Main Configuration](./src/config/config.js)
- [Test Script](../test-connection.js) 