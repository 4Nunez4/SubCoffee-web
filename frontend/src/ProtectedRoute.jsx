import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import ModalProtectMolecule from "./components/molecules/ModalProtectMolecule";
import AbrirModalTemplate from "./components/templates/AbrirModalTemplate";

function ProtectedRoute() {
  const auth = window.localStorage.getItem("token");

  return auth ? (
    <Outlet />
  ) : (
    <AbrirModalTemplate>
      <ModalProtectMolecule />
    </AbrirModalTemplate>
  );
}

export default ProtectedRoute;
