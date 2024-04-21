import React, { useState } from "react";

import { icono } from "../atoms/IconsAtom";
import TextSubAtom from "../atoms/TextSubAtom";
import AvatarAtom from "../atoms/AvatarAtom";
import ButtonAtom from "../atoms/ButtonAtom";
import SearchBarMolecule from "../molecules/SearchBarMolecule";
import ModalCerrarSesion from "../molecules/ModalLogoutMolecule";
import ModalMessaAndNoti from "../molecules/ModalMessaAndNoti";
import IconHeaderAtom from "../atoms/IconHeaderAtom";
import ButtonCerrarModalAtom from "../atoms/ButtonCerrarModalAtom";
import AbrirModalTemplate from "../templates/AbrirModalTemplate";
import LoginPageOrganism from "./LoginPageOrganism";
import ModalBuscarMolecule from "../molecules/ModalBuscarMolecule";

import { User } from "@nextui-org/react";

function HeaderOrganism() {
  const [abrirModalLogin, setAbrirModalLogin] = useState(false);
  const isAuthenticated = window.localStorage.getItem("token");
  const [abrirCerrarSesion, setAbrirCerrarSesion] = useState(false);
  const [abrirBell, setAbrirBell] = useState(false);
  const [abrirBuscador, setAbrirBuscador] = useState(false);
  const [isMoonSelected, setIsMoonSelected] = useState(false);
  //const { users } = useContext(AuthContext);
  const storedUser = localStorage.getItem("user");
  const users = storedUser ? JSON.parse(storedUser) : null;

  const toggleCerrarSesionModal = () => {
    setAbrirCerrarSesion(!abrirCerrarSesion);
    setAbrirBell(false);
    setAbrirBuscador(false);
  };

  const toggleAbrirBell = () => {
    setAbrirBell(!abrirBell);
    setAbrirCerrarSesion(false);
    setAbrirBuscador(false);
  };

  const toggleAbrirModalBuscador = () => {
    setAbrirBuscador(!abrirBuscador);
    setAbrirCerrarSesion(false);
    setAbrirBell(false);
  };

  const toggleAbrirModalLogin = () => {
    setAbrirModalLogin(!abrirModalLogin);
  };

  const toggleTheme = () => {
    setIsMoonSelected((prevValue) => !prevValue);
  };

  console.log(users);

  return (
    <nav className="bg-slate-300">
      {isAuthenticated ? (
        <nav className="flex justify-between items-center bg-verdeSena2 w-full p-4 shadow-sm">
          <div className="flex flex-col">
            <TextSubAtom
              to="/subcoffee"
              color="cafeClaroLogo"
              text="Bienvenido"
            />
          </div>
          <SearchBarMolecule onClick={() => setAbrirBuscador(true)} />
          <div className="flex gap-x-3 items-center">
            <IconHeaderAtom onClick={toggleAbrirBell}>
              <icono.iconoCampana className="h-5 w-5" />
            </IconHeaderAtom>
            {isMoonSelected ? (
              <icono.iconoLuna
                onClick={toggleTheme}
                className="text-blanco cursor-pointer"
              />
            ) : (
              <icono.iconoSol
                onClick={toggleTheme}
                className="text-blanco cursor-pointer"
              />
            )}
            {users && (
              <button
                className="flex items-center gap-x-2"
                onClick={toggleCerrarSesionModal}
              >
              <User   
                name={`${users.nombre_user}`}
                description={`${users.rol_user}`}
                className="text-blanco"
                avatarProps={{
                  src: `./src/assets/${users.imagen_user}`
                }}
              />
              </button>
            )}
          </div>
          {abrirCerrarSesion && (
            <div className="absolute top-16 right-2 flex justify-center items-center">
              <div className="bg-gray-400 rounded-xl">
                <ModalCerrarSesion onClose={toggleCerrarSesionModal} />
              </div>
            </div>
          )}
          {abrirBell && (
            <div className="absolute top-16 right-32 flex justify-center items-center">
              <div className="bg-white rounded-xl w-80">
                <ModalMessaAndNoti onClose={toggleAbrirBell} />
              </div>
            </div>
          )}
          {abrirBuscador && (
            <div className="absolute top-16 left-[585px] flex justify-center items-center">
              <div className="bg-white rounded-xl w-[300px]">
                <ModalBuscarMolecule onClose={toggleAbrirModalBuscador} />
              </div>
            </div>
          )}
        </nav>
      ) : (
        <nav className="flex justify-between items-center bg-slate-300 fixed w-full m-0 top-0 p-4 shadow-sm">
          <div className="flex items-center">
            <AvatarAtom img="isotipo-SubCoffee.png" />
            <TextSubAtom to="/" color="cafeClaroLogo" text="Sub" />
            <TextSubAtom to="/" color="cafeOscuroLogo" text="Coffee" />
          </div>
          <div className="flex items-center gap-x-3">
            <div className="cursor-pointer">
              {isMoonSelected ? (
                <icono.iconoLuna onClick={toggleTheme} />
              ) : (
                <icono.iconoSol onClick={toggleTheme} />
              )}
            </div>
            <ButtonAtom onClick={() => setAbrirModalLogin(true)}>
              Iniciar sesión
            </ButtonAtom>
          </div>
        </nav>
      )}
      {abrirModalLogin && (
        <AbrirModalTemplate>
          <LoginPageOrganism />
          <ButtonCerrarModalAtom onClose={toggleAbrirModalLogin} />
        </AbrirModalTemplate>
      )}
    </nav>
  );
}

export default HeaderOrganism;
