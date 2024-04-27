import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { RiSettings4Line } from "react-icons/ri";
import { AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { icono } from "../atoms/IconsAtom";

const storedUser = localStorage.getItem("user");
const users = storedUser ? JSON.parse(storedUser) : null;

const SidebarOrganims = () => {
  const [open, setOpen] = useState(true);
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);
  const Menus = [
    { title: "Inicio", link: "/subcoffee", icon: icono.iconoHome },
    ...(users && users.rol_user === "admin"
      ? [
          { title: "Usuarios", link: "/users", icon: icono.iconoRol },
          { title: "Tipo Variedad", link: "/tipo_variedad", icon: icono.iconoFlor },
          { title: "Geografía", link: "/geografia", icon: icono.iconoWorl },
        ]
      : []),
    ...(users && users.rol_user === "vendedor"
      ? [
          { title: "Mis subastas", link: "/mi_subasta", icon: icono.iconoType },
        ]
      : []),
    ...(users && users.rol_user === "comprador"
      ? [{ title: "Usuarios", link: "/usuarios", icon: AiOutlineUser }]
      : []),
    { title: "Ayudaaa", link: "/ayudaaa", icon: icono.iconoAyuda, gap: true },
    { title: "Configuración", link: "/configuration", icon: icono.iconoConfiguracion },
    {
      title: "Politicas privacidad",
      link: "/poli",
      icon: icono.iconoPrivacidad,
    },
  ];
  useEffect(() => {
    setOpen(true)
  }, [])

  return (
    <>
      <div className="flex min-h-screen bg-blancoMedio1">
        <div
          className={`${
            open ? "w-60" : "w-20"
          } bg-gray-600 max-h-full p-5 pt-5 relative duration-300`}
        >
          <img
            src="./src/assets/control.png"
            className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
                border-2 rounded-full  ${!open && "rotate-180"}`}
            onClick={() => setOpen(!open)}
          />
          <div className={`flex items-center`}>
            <img
              src="/src/assets/isotipo-SubCoffee.png"
              className={`cursor-pointer duration-500 h-9 w-9${
                open && "rotate-[360deg]"
              }`}
            />
            <h1
              className={`text-gray-300 origin-left ml-2 font-medium text-xl duration-200 overflow-hidden whitespace-nowrap ${
                !open && "scale-0"
              }`}
              style={{ maxWidth: "calc(100% - 4rem)" }} // Establecer un ancho máximo para evitar que el título se desborde
              title="Subcoffee" // Agregar un título para mostrar el texto completo al pasar el mouse
            >
              Subcoffee
            </h1>
          </div>
          <ul className="pt-6">
            {Menus.map((Menu, index) => (
              <Link
                to={Menu?.link}
                key={index}
                onClick={() => setActiveLink(Menu.link)}
                className={`flex rounded-md p-2 cursor-pointer hover:bg-gray-500 text-gray-300 text-sm items-center gap-x-3 ${
                  Menu.gap ? "mt-9" : "mt-2"
                } ${activeLink === Menu.link ? "bg-gray-500" : ""}`}
              >
                <div>{React.createElement(Menu?.icon, { size: "20" })}</div>
                <span
                  className={`${!open && "hidden"}
                         origin-left duration-200 overflow-hidden whitespace-nowrap`}
                  style={{ maxWidth: "calc(100% - 3rem)" }} // Establecer un ancho máximo para evitar que el título se desborde
                  title={Menu.title} // Agregar un título para mostrar el texto completo al pasar el mouse
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

export default SidebarOrganims;
