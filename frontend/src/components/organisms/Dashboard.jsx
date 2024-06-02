import React, { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import HeaderOrganism from "./HeaderOrganism";
import FooterOrganism from "./FooterOrganism";
import SidebarOrganims from  "./SidebarOrganims"
import AuthContext from "../../context/AuthContext";

const Dashboard = () => {
  const auth = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const { isAuthenticated } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) return navigate("/subcoffee")
  }, [isAuthenticated])

  return auth && user ? (
    <div className="flex flex-auto h-auto bg-gray-50">
      <SidebarOrganims />
      <div className="grow ">
        <HeaderOrganism />
        <Outlet />
      </div>
    </div>
  ) : (
    <div className="flex-auto h-auto bg-gray-50">
      <HeaderOrganism />
      <main className="">
        <Outlet />
      </main>
      <FooterOrganism />
    </div>
  );
};

export default Dashboard;
