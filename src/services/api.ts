import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/auth", // your backend URL
});

// Add token automatically for protected routes
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const signup = (name: string, phone: string) => API.post("/signup", { name, phone });
export const login = (phone: string) => API.post("/login", { phone });
export const sendOtp = (phone: string) => API.post("/send-otp", { phone });
export const verifyOtp = (phone: string, otp: string) => API.post("/verify-otp", { phone, otp });

export const getProfile = () => API.get("/profile");
export const updateProfile = (name: string) => API.put("/profile", { name });
