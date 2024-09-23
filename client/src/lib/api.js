import axios from "axios";

// Our API middleware where we handle the requests made from frontend and send them into the NodeJS server in a proper format.

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
export const saveFlight = (flightData, token) =>
  api.post("/flights/save", { token, flightData });
export const unsaveFlight = (flightId, token) =>
  api.post("/flights/unsave", { token, flightId });
export const userFlights = (token) =>
  api.get("/flights/saved", {
    headers: {
      "x-auth-token": token,
    },
  });
