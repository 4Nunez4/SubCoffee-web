import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import HeaderOrganism from "./HeaderOrganism";
import FooterOrganism from "./FooterOrganism";
import SidebarOrganims from  "./SidebarOrganims"
import { useAuthContext } from "../../context/AuthContext";

const Dashboard = () => {
  const auth = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const { isAuthenticated } = useAuthContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) return navigate("/subcoffee")
  }, [isAuthenticated])

  return auth && user ? (
    <div className="flex flex-auto h-auto bg-gray-50">
      <SidebarOrganims />
      <div className="grow">
        <HeaderOrganism />
        <Outlet />
      </div>
    </div>
  ) : (
    <div className="flex-auto h-auto bg-gray-50">
      <HeaderOrganism />
      <div>
        <Outlet />
      </div>
      <FooterOrganism />
    </div>
  );
};

export default Dashboard;
