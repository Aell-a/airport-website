"use client";
import React, { createContext, useContext, useReducer, useEffect } from "react";
import { getUser, login, signup } from "@/lib/api";

// Our auth middleware uses useContext hook from React and handles authentication in a way that is shared across all app.

const AuthContext = createContext();

const initialState = {
  user: null,
  isLoading: false,
  error: null,
};

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
    case "SIGNUP":
    case "AUTH_SUCCESS":
      return { ...state, user: action.payload, isLoading: false, error: null };
    case "LOGOUT":
      return { ...state, user: null };
    case "AUTH_FAILURE":
      return { ...state, error: action.payload, isLoading: false };
    case "LOADING":
      return { ...state, isLoading: true };
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !state.user) {
      checkAuth();
    }
  }, [state.user]);

  const checkAuth = async () => {
    dispatch({ type: "LOADING" });
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await getUser(token);
        dispatch({ type: "AUTH_SUCCESS", payload: response.data.userId });
      } catch (error) {
        console.error("Matching ID cannot be found");
        dispatch({ type: "AUTH_FAILURE", payload: error.message });
      }
    }
  };

  const handleLogin = async (email, password) => {
    dispatch({ type: "LOADING" });
    try {
      const response = await login(email, password);
      localStorage.setItem("token", response.data.token);
      dispatch({ type: "LOGIN", payload: response.data.userId });
    } catch (error) {
      console.error("Login error:", error);
      dispatch({ type: "AUTH_FAILURE", payload: error.message });
    }
  };

  const handleSignup = async (email, password) => {
    dispatch({ type: "LOADING" });
    try {
      const response = await signup(email, password);
      localStorage.setItem("token", response.data.token);
      dispatch({ type: "SIGNUP", payload: response.data.userId });
    } catch (error) {
      console.error("Signup error:", error);
      dispatch({ type: "AUTH_FAILURE", payload: error.message });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login: handleLogin,
        signup: handleSignup,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
