import React, { useState } from "react";

function ProfileUser() {
  const SubastasCreadas = [
    {
      id: 1,
      titulo: "Subasta 1",
      descripcion: "Descripción de la subasta 1",
    },
    {
      id: 2,
      titulo: "Subasta 2",
      descripcion: "Descripción de la subasta 2",
    },
    {
      id: 3,
      titulo: "Subasta 1",
      descripcion: "Descripción de la subasta 1",
    },
    {
      id: 4,
      titulo: "Subasta 2",
      descripcion: "Descripción de la subasta 2",
    },
  ];

  const SubastasGanadas = [
    {
      id: 1,
      titulo: "Subasta 3",
      descripcion: "Descripción de la subasta 3",
    },
    {
      id: 2,
      titulo: "Subasta 4",
      descripcion: "Descripción de la subasta 4",
    },
    {
      id: 3,
      titulo: "Subasta 3",
      descripcion: "Descripción de la subasta 3",
    },
    {
      id: 4,
      titulo: "Subasta 4",
      descripcion: "Descripción de la subasta 4",
    },
  ];

  const [activeTab, setActiveTab] = useState("creadas");

  return (
      <div className="px-32 mb-9">
    <div className="relative mt-4">
      <img
        src="./src/assets/finca_fondo.jpg"
        className="w-full rounded-lg"
        alt="Finca de usuario"
      />
      <div className="absolute top-3/4 left-5">
        <img
          src="./src/assets/caficultor.jpeg" 
          className="border-3 border-lime-600 rounded-full w-28 h-28"
          alt=""
        />
      </div>
    </div>
    <div className="flex mt-4 justify-between">
      <div className="flex">
        <div className="grid grid-cols-1 gap-y-1">
          <span className="text-lg font-semibold">José Arturo Silvestre Palechor</span>
          <div className="flex flex-wrap">
            <i >
              <span className="text-sm text-gray-600  pr-5">3210933333</span>
              <span className="text-sm text-gray-600 pr-5">12-04-1974</span>
              <span className="text-sm text-gray-600">arturo@gmail.com</span>
            </i>
          </div>
          <span className="text-sm text-gray-600">Comprador y vendedor de la ciudad de Pitalito con 20 años de experiencia en la caficultura</span>
        </div>
      </div>
      {/* <div>
        <button className="text-sm bg-green-400 text-white p-2 rounded hover:bg-green-300">Editar perfil</button>
      </div> */}
    </div>


     
    </div>
  );
}

export default ProfileUser;