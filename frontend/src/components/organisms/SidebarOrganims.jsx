import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { icono } from "../atoms/IconsAtom";

const SidebarOrganims = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const token = localStorage.getItem('token')
  const [open, setOpen] = useState(() => JSON.parse(localStorage.getItem("sidebarOpen")) || true);
  const location = useLocation();
  const [sidebar, setSidebar] = useState(false);
  const [activeLink, setActiveLink] = useState(location.pathname);

  const Menus = [
    ...(user && token && user.rol_user === "admin" ? [
      { title: "Usuarios", link: "/users", icon: icono.iconoRol },
      { title: "Geografía", link: "/geografia", icon: icono.iconoWorl },
      { title: "Tipo Variedad", link: "/tipo_variedad", icon: icono.iconoFlor }
    ] : []),
    ...(user && token && user.rol_user === "vendedor" ? [
      { title: "Inicio", link: "/subcoffee", icon: icono.iconoHome },
      { title: "Mis subastas", link: "/mi_subasta", icon: icono.iconoType },
      { title: "Notificaciones", link: "/notificaciones", icon: icono.iconoCampana },

      { title: "Políticas de privacidad", link: "/privacy-policy", icon: icono.iconoPrivacidad },
      { title: "Ayuda", link: "/ayuda", icon: icono.iconoAyuda }
    ] : []),
    ...(user && token && user.rol_user === "comprador" ? [
      { title: "Inicio", link: "/subcoffee", icon: icono.iconoHome },
      { title: "Notificaciones", link: "/notificaciones", icon: icono.iconoCampana },
      { title: "Políticas de privacidad", link: "/privacy-policy", icon: icono.iconoPrivacidad },
      { title: "Ayuda", link: "/ayuda", icon: icono.iconoAyuda }
    ] : [])
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebar(false);
      } else {
        setSidebar(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("sidebarOpen", JSON.stringify(open));
  }, [open]);

  return (
    <div className="flex min-h-screen ">
      {sidebar ? (
        <div
          className={`${open ? "w-60" : "w-20"}  bg-[#FDFBF6] max-h-full p-5 pt-5 relative duration-300 border-r-[#4A9F1F] border-1`}
        >
        <img
          src="./src/assets/control.png"
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
            border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex items-center">
          <img
            src="/src/assets/isotipo-SubCoffee.png"
            className={`duration-500 h-10 w-10 ${open ? "rotate-[360deg]" : ""}`}
          />
          <h1
            className={`text-[#323232] origin-left ml-2 font-bold text-2xl duration-200 overflow-hidden whitespace-nowrap ${
              !open && "scale-0"
            }`}
            style={{ maxWidth: "calc(100% - 4rem)" }}
            title="Subcoffee"
          >
             Sub<span className="text-[#39A800]">Coffee</span>
          </h1>
          </div>
          <ul className="pt-6">
            {Menus.map((Menu, index) => (
              <Link
                to={Menu.link}
                key={index}
                onClick={() => setActiveLink(Menu.link)}
                className={`flex rounded-md p-2 cursor-pointer text-[#39A800] border-solid border-2 border-[#39A800]  text-sm items-center gap-x-3 ${
                  activeLink === Menu.link? "bg-[#39A800] text-[#FDFBF6]" : "hover:bg-[#39A800] hover:text-[#FDFBF6]"
                } ${Menu.gap? "mt-9" : "mt-2"}`}
              >
                <div>{React.createElement(Menu.icon, { size: "20" })}</div>
                <span
                  className={`${!open && "hidden"} origin-left duration-200 overflow-hidden whitespace-nowrap`}
                  style={{ maxWidth: "calc(100% - 3rem)" }}
                  title={Menu.title}
                  >
                  {Menu.title}
                </span>
              </Link>
            ))}
          </ul>
        </div>
      ): []}
    </div>
  );
};

export default SidebarOrganims;
