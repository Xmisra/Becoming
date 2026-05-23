import axios from "axios";

// One shared Axios client keeps the backend URL and cookie setting in one place.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8003",
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && !error.config?.skipAuthRedirect) {
      window.dispatchEvent(new Event("auth:unauthorized"));
    }

    return Promise.reject(error);
  }
);

export function getApiError(error, fallback = "Something went wrong.") {
  return error.response?.data?.error || error.response?.data?.message || fallback;
}

export default api;
