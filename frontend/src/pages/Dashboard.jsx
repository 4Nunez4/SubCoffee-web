import React from "react";
import { Outlet } from "react-router-dom";

import HeaderOrganism from "../components/organisms/HeaderOrganism";
import FooterOrganism from "../components/organisms/FooterOrganism";
import SidebarOrganims from  "../components/organisms/SidebarOrganims"

const Dashboard = () => {
  const auth = window.localStorage.getItem("token");

  return auth ? (
    <div className="flex flex-auto h-auto">
      <SidebarOrganims />
      <div className="grow">
        <HeaderOrganism />
        <Outlet />
        <FooterOrganism />
      </div>
    </div>
  ) : (
    <div className="flex-auto h-screen">
      <HeaderOrganism />
      <main>
        <Outlet />
      </main>
      <FooterOrganism />
    </div>
  );
};

export default Dashboard;
