import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Swal from "sweetalert2";

function ProtectedRoute() {
  const auth = localStorage.getItem("token");
  
  const handleLoginRedirect = () => {
    Swal.fire({
      text: "Tienes que iniciar sesión primero para poder ingresar a SubCoffee",
      icon: "error"
    });
    return <Navigate to="/" />;
  }

  return auth ? (
    <Outlet />
  ) : (
    handleLoginRedirect()
  );
}

export default ProtectedRoute;
