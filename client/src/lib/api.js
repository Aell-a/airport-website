import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const login = (email, password) =>
  api.post("/auth/login", { email, password });
export const signup = (email, password) =>
  api.post("/auth/register", { email, password });
export const getUser = (token) =>
  api.get("/auth/user", {
    headers: {
      "x-auth-token": token,
    },
  });
export const searchFlights = (airport, date, isArriving) =>
  api.get("/flights/search", {
    params: {
      airport: airport.toUpperCase(),
      date: date,
      direction: isArriving ? "A" : "D",
    },
  });
export const saveFlight = (flightId, token) =>
  api.post("/flights/save", { token, flightId });
export const unsaveFlight = (flightId, token) =>
  api.post("/flights/unsave", { token, flightId });
