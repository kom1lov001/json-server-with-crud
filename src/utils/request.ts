import axios from "axios";

// baseURL: import.meta.env.VITE_BASE_API + "/api",
export const request = axios.create({
    baseURL: import.meta.env.VITE_BASE_API_URL,
    timeout: 60000,
});

// Request interceptors
request.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        Promise.reject(error);
    },
);

// Response interceptors
request.interceptors.response.use(
    (response) => response.data,
    (error) => {
        const errorResponse = JSON.parse(error.request.response);
        if (errorResponse.statusCode !== 401) {
            const errorMessage = errorResponse.message || "An error occurred";
            console.error("Error:", errorMessage);
        }
        return Promise.reject(error);
    },
);
export const request_local = axios.create({
    baseURL: import.meta.env.VITE_BASE_API_URL,
    timeout: 60000,
});

// Request interceptors
request_local.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        Promise.reject(error);
    },
);

// Response interceptors
request_local.interceptors.response.use(
    (response) => response.data,
    (error) => {
        const errorResponse = JSON.parse(error.request.response);
        if (errorResponse.statusCode !== 401) {
            const errorMessage = errorResponse.message || "An error occurred";
            console.error("Error:", errorMessage);
        }
        return Promise.reject(error);
    },
);
