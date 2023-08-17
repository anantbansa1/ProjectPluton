import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./firebase";
import React from "react";
import Navbar from "./components/Navbar";

export default function PrivateRoute() {
  const user = useAuth();
  if (user === undefined) return null;
  return user ? (
    <>
      <Navbar />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
}
