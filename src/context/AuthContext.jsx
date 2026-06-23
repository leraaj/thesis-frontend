import { createContext, useEffect, useReducer, useState } from "react";
import API from "../utils/axios/axios";
import delay from "../utils/display/delay";

export const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        user: action.payload,
      };

    case "LOGOUT":
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      return {
        user: null,
      };

    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      dispatch({
        type: "LOGIN",
        payload: user,
      });
    }
  }, []);

  const login = async (login, password) => {
    setIsLoading(true);
    try {
      const response = await API.post("/auth/login", {
        login,
        password,
      });
      await delay();
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", response.data.token);

      dispatch({
        type: "LOGIN",
        payload: response.data.user,
      });

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message:
          error?.response?.data?.message || error?.message || "Login failed",
      };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);

    try {
      const response = await API.post("/auth/logout", {
        userId: state.user?.id,
      });

      await delay();
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      dispatch({
        type: "LOGOUT",
      });

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message:
          error?.response?.data?.message || error?.message || "Logout failed",
      };
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        dispatch,
        login,
        logout,
        isLoading,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
