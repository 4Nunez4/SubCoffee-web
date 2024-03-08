import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useState } from "react";

function Layout({ children }) {
  const [isAuthenticated] = useState(true);
  return (
    <>
      {isAuthenticated ? (
        <div className="flex flex-auto h-auto">
          <Sidebar />
          <div className="grow">
            <Navbar />
            <div>{children}</div>
          </div>
        </div>
      ) : (
        <div className="flex-auto h-screen">
          <Navbar />
          <div>{children}</div>
        </div>
      )}
    </>
  );
}

export default Layout;
