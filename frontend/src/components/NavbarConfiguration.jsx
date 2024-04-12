import React from "react";

function NavbarConfiguration() {
  return (
    <div className="flex flex-col w-64 bg-gray-200 p-4 shadow-md">
      <div className="flex flex-col items-center mb-4">
        <img
          src="./src/assets/profile_user.jfif"
          alt=""
          className="rounded-full w-16 h-16"
        />
        <div className="flex flex-col">
          <p className="text-sm font-semibold">Juan Camilo</p>
          <p className="text-xs text-gray-600">juan@gmail.com</p>
        </div>
      </div>
      <button className="bg-blue-500 text-sm text-white rounded-lg py-2 px-4 mb-2 hover:bg-blue-600">Mi cuenta</button>
      <button className="bg-blue-500 text-sm text-white rounded-lg py-2 px-4 mb-2 hover:bg-blue-600">Acceso y seguridad</button>
      <button className="bg-blue-500 text-sm text-white rounded-lg py-2 px-4 mb-2 hover:bg-blue-600">Configuración de privacidad</button>
      <button className="bg-blue-500 text-sm text-white rounded-lg py-2 px-4 hover:bg-blue-600">Términos y condiciones</button>
    </div>
  );
}

export default NavbarConfiguration;
