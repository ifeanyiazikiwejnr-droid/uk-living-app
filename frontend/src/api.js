import axios from "axios";
import { API_BASE_URL } from "./config";
import { getToken } from "./auth/tokenStorage";

export const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  timeout: 15000,
});

// Attach token to every request if available
api.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
