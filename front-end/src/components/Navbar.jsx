import { useState } from "react";
import { Link } from "react-router-dom";
import { CiCircleList, CiSearch } from "react-icons/ci";
import { icono } from "./atomos/IconsAtom";
import IconHeaderAtom from "./atomos/IconHeaderAtom";
import ModalMessaAndNoti from "./moleculas/ModalMessaAndNoti";
import ButtonCerrarModalAtom from "./atomos/ButtonCerrarModalAtom";

function Navbar() {
  const [isAuthenticated] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [abrirBell, setAbrirBell] = useState(false);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const toggleAbrirBell = () => {
    setAbrirBell(!abrirBell);
  };

  return (
    <>
      {isAuthenticated ? (
        <div className="flex-1">
          <nav className="flex justify-between text-black font-roboto-regular text-lg bg-gray-200">
            <ul className="ml-5 flex gap-x-5 items-center">
              <li className="flex flex-col">
                <Link to={"/"}>Bienvenido</Link>
                <span>Juan</span>
              </li>
            </ul>
            <div className="flex items-center">
              <CiSearch className="absolute" />
              <input
                type="text"
                placeholder="Buscar usuarios"
                value={searchTerm}
                onChange={handleSearch}
                className="px-6 pr-40 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <CiCircleList className="absolute" />
            </div>
            <ul className="flex gap-x-5 p-5">
              <IconHeaderAtom onClick={toggleAbrirBell}>
                <icono.iconoCampana className="h-5 w-5" />
              </IconHeaderAtom>
              <li>
                <Link to={"/ResultadoModal"}>Crear subasta</Link>
              </li>
              <li>
                <Link to={"/"}>
                  <img
                    src="./src/assets/profile_user.jfif"
                    alt=""
                    className="w-7 h-7 rounded-full cursor-pointer"
                  />
                </Link>
              </li>
            </ul>
            {abrirBell && (
              <div className="absolute top-16 right-32 flex justify-center items-center">
                <div className="bg-blanco rounded-xl w-80">
                  <ModalMessaAndNoti onClose={toggleAbrirBell} />
                </div>
                <ButtonCerrarModalAtom
                  onClose={() => toggleAbrirBell(false)}
                />
              </div>
            )}
          </nav>
        </div>
      ) : (
        <div className="flex-1">
          <nav className="flex justify-between text-black font-roboto-regular bg-[#39A900]">
            <ul className="flex gap-x-5 p-5">
              <li>
                <Link to={"/dashboard"} className="text-white text-xl">
                  Subcoffee
                </Link>
              </li>
            </ul>
            <ul className="flex gap-x-5 p-5">
              <li>
                <Link
                  to={"/login"}
                  className="text-white rounded-lg p-3 hover:bg-green-800 border-white border-2"
                >
                  Iniciar sesión
                </Link>
              </li>
              <li>
                <Link
                  to={"/"}
                  className="text-[#39A900] bg-white p-3 rounded-lg"
                >
                  Registrarse
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}

export default Navbar;
