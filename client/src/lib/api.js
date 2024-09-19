import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const login = (email, password) =>
  api.post("/auth/login", { email, password });
export const signup = (email, password) =>
  api.post("/auth/register", { email, password });
export const updateProfile = (userData) => api.put("/auth/profile", userData);
