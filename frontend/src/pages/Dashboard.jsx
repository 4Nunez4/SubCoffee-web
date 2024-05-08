import React from "react";
import { Outlet } from "react-router-dom";

import HeaderOrganism from "../components/organisms/HeaderOrganism";
import FooterOrganism from "../components/organisms/FooterOrganism";
import SidebarOrganims from  "../components/organisms/SidebarOrganims"

const Dashboard = () => {
  const auth = localStorage.getItem("token");

  return auth ? (
    <div className="flex flex-auto h-auto bg-gray-100">
      <SidebarOrganims />
      <div className="grow">
        <HeaderOrganism />
        <Outlet />
      </div>
    </div>
  ) : (
    <div className="flex-auto h-auto">
      <HeaderOrganism />
      <main className="grow mt-16">
        <Outlet />
      </main>
      <FooterOrganism />
    </div>
  );
};

export default Dashboard;
