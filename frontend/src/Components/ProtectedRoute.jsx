import React, { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";

export const ProtectedRoute = ({ children }) => {
  const { isAuth } = useContext(AuthContext);
  console.log(isAuth);

  if (!isAuth) {
    return <Navigate to="/login" replace={false} />;
  }

  return children;
};
