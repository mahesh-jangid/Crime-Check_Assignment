import React from "react";
import { createContext, useState } from "react";
import { useSelector } from "react-redux";
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const { userInfo } = useSelector((state) => state.userSignin);
  const [isAuth, setIsAuth] = useState(userInfo?.isLoggedIn);

  const handleAuth = (state) => {
    setIsAuth(state);
  };

  return (
    <AuthContext.Provider value={{ isAuth, handleAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
