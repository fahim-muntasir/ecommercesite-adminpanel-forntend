import axios from "axios";
import { createContext, useContext, useState } from "react";

const CreateContext = createContext();

export const UseContext = () => {
  return useContext(CreateContext);
};

export default function ContextProvider({ children }) {
  const [isLogin, setIsLogin] = useState(false);

  const login = async ({ userName, password }, cd) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_API_URL}/login`,
        { userName, password }
      );
      localStorage.setItem("Auth", data?.token);

      setIsLogin(true);
      cd(data);
    } catch ({ response }) {
      cd({ error: true, data: response.data });
    }
  };

  const logout = () => {
    localStorage.removeItem("Auth");
    window.location.href = "/login";
  };

  const value = {
    login,
    isLogin,
    setIsLogin,
    logout,
  };

  return (
    <CreateContext.Provider value={value}>
      {children}
    </CreateContext.Provider>
  );
}
