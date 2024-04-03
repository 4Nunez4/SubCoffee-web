import { Link, useLocation } from "react-router-dom";
import React, { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { FiMessageSquare } from "react-icons/fi";
import { FiBarChart } from "react-icons/fi";
import { IoNotificationsOutline } from "react-icons/io5";
import { RiAuctionLine } from "react-icons/ri";
import { HiOutlineHand } from "react-icons/hi";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  const Menus = [

    { title: "user", link: "/dashboard", icon: AiOutlineUser },
    { title: "messages", link: "/subcoffee", icon: FiMessageSquare },
    { title: "chat", link: "/chat", icon: FiBarChart },
    { title: "Notificaciones", link: "/Notificaciones", icon: IoNotificationsOutline },
    { title: "Subasta", link: "/Subasta", icon: RiAuctionLine },
    { title: "Oferta", link: "/Oferta", icon: HiOutlineHand },

  ];

  return (
    <>
      <div className="flex min-h-screen">
        <div
          className={`${
            open ? "w-64" : "w-20"
          } bg-green-600 max-h-full p-5 pt-5 relative duration-300`}
        >
          <img
            src="./src/assets/control.png"
            className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
                border-2 rounded-full  ${!open && "rotate-180"}`}
            onClick={() => setOpen(!open)}
          />
          <div className="flex gap-x-4 items-center">
            <img
              src="./src/assets/logo.png"
              className={`cursor-pointer duration-500 ${
                open && "rotate-[360deg]"
              }`}
            />
            <h1
              className={`text-white origin-left font-medium text-xl duration-200 ${
                !open && "scale-0"
              }`}
            >
              Subcoffee
            </h1>
          </div>
          <ul className="pt-6">
            {Menus.map((Menu, i) => (
              <Link
                to={Menu?.link}
                key={i}
                onClick={() => setActiveLink(Menu.link)}
                className={`flex rounded-md p-2 cursor-pointer hover:bg-green-500 text-gray-300 text-sm items-center gap-x-4 ${
                  Menu.gap ? "mt-9" : "mt-2"
                } ${activeLink === Menu.link ? "bg-green-500" : ""}`}
              >
                <div>{React.createElement(Menu?.icon, { size: "20" })}</div>
                <span
                  className={`${!open && "hidden"}
                         origin-left duration-200`}
                >
                  {Menu.title}
                </span>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
