import axios from "axios";
import accessToken from "./jwt-token-access/accessToken";
import API_CONFIG from "../config/api.config";

//pass new generated access token here
const token = accessToken;

// Create axios instance with centralized configuration
const axiosApi = axios.create({
  baseURL: API_CONFIG.NODE_SERVER.API_BASE_URL,
  timeout: API_CONFIG.NODE_SERVER.TIMEOUT,
});

// Set default authorization header
axiosApi.defaults.headers.common["Authorization"] = token;

// Add request interceptor to include auth token from localStorage
axiosApi.interceptors.request.use(
  (config) => {
    const authUser = localStorage.getItem(API_CONFIG.AUTH.TOKEN_KEY);
    if (authUser) {
      const user = JSON.parse(authUser);
      if (user.accessToken) {
        config.headers.Authorization = `${API_CONFIG.AUTH.TOKEN_PREFIX} ${user.accessToken}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosApi.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default axiosApi;

export async function get(url, config = {}) {
  return await axiosApi
    .get(url, { ...config })
    .then((response) => response.data);
}

export async function post(url, data, config = {}) {
  return axiosApi
    .post(url, { ...data }, { ...config })
    .then((response) => response.data);
}

export async function put(url, data, config = {}) {
  return axiosApi
    .put(url, { ...data }, { ...config })
    .then((response) => response.data);
}

export async function del(url, config = {}) {
  return await axiosApi
    .delete(url, { ...config })
    .then((response) => response.data);
}
