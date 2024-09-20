import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const login = (email, password) =>
  api.post("/auth/login", { email, password });
export const signup = (email, password) =>
  api.post("/auth/register", { email, password });
export const updateProfile = (userData) => api.put("/auth/profile", userData);
export const getUser = (token) =>
  api.get("/auth/user", {
    headers: {
      "x-auth-token": token,
    },
  });
export const destinations = (userInput) =>
  api.get("/flights/destinations", userInput);
export const searchFlights = (airport, date, isArriving) =>
  api.get("/flights/search", {
    params: {
      airport: airport.toUpperCase(),
      date: date,
      direction: isArriving ? "A" : "D",
    },
  });
