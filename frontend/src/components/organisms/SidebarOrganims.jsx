import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { RiSettings4Line } from "react-icons/ri";
import { AiOutlineUser, AiOutlineHeart } from "react-icons/ai";

import AvatarAtom from "../atoms/AvatarAtom";
import TextSubAtom from "../atoms/TextSubAtom";
import MessageOfLifeMolecule from "../molecules/MessageOfLifeMolecule";
const storedUser = localStorage.getItem("user");
const users = storedUser ? JSON.parse(storedUser) : null;

const SidebarOrganims = () => {
  const [open, setOpen] = useState(true);
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);
  const Menus = [
    { title: "Inicio", link: "/subcoffee", icon: AiOutlineUser },
    ...(users && users.rol_user === "admin"
      ? [
          { title: "Uusarios", link: "/users", icon: AiOutlineUser },
          { title: "Usuarios", link: "/usuarios", icon: AiOutlineUser },
          {
            title: "Geografía",
            link: "/geografia",
            icon: AiOutlineHeart,
          },
        ]
      : []),
    ...(users && users.rol_user === "vendedor"
      ? [
          {
            title: "Mis subastas",
            link: "/ayuda",
            icon: AiOutlineHeart,
            gap: true,
          },
        ]
      : []),
    { title: "Ayudaaa", link: "/ayudaaa", icon: AiOutlineHeart, gap: true },
    { title: "Configuración", link: "/configuration", icon: RiSettings4Line },
    {
      title: "Politicas privacidad",
      link: "/poli",
      icon: RiSettings4Line,
    },
  ];

  return (
    <>
      <div className="flex min-h-screen bg-blancoMedio1">
        <div
          className={`${
            open ? "w-64" : "w-20"
          } bg-gray-600 max-h-full p-5 pt-5 relative duration-300`}
        >
          <img
            src="./src/assets/control.png"
            className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
                border-2 rounded-full  ${!open && "rotate-180"}`}
            onClick={() => setOpen(!open)}
          />
          <div className={`flex items-center`}>
            <AvatarAtom
              img="isotipo-SubCoffee.png"
              className={`${open && "rotate-[360deg]"}`}
            />
            <TextSubAtom
              to="/subcoffee"
              color="gray-400"
              text="SubCoffee"
              className={`${!open && "scale-0"}`}
            />
          </div>
          <ul className="pt-6">
            {Menus.map((Menu, index) => (
              <Link
                to={Menu?.link}
                key={index}
                onClick={() => setActiveLink(Menu.link)}
                className={`flex rounded-md p-2 cursor-pointer hover:bg-gray-500 text-gray-300 text-sm items-center gap-x-4 ${
                  Menu.gap ? "mt-9" : "mt-2"
                } ${activeLink === Menu.link ? "bg-gray-500" : ""}`}
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
          <div className="flex justify-center items-center my-5 sm:hidden">
            <MessageOfLifeMolecule />
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarOrganims;
