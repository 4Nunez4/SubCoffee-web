import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Swal from "sweetalert2";

function ProtectedRoute({ allowedRoles }) {
  const auth = localStorage.getItem("token");
  const users = JSON.parse(localStorage.getItem("user"));
  
  if (!auth || !users) {
    Swal.fire({
      text: "Tienes que iniciar sesión primero para poder ingresar a SubCoffee",
      icon: "error"
    });
    return <Navigate to="/" />;
  }

  if (allowedRoles && !allowedRoles.includes(users.rol_user)) {
    Swal.fire({
      text: "No tienes permiso para acceder a estas página",
      icon: "error"
    });
    return <Navigate to="/" />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
