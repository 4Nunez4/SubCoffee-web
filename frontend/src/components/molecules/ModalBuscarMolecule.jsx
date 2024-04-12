import React, { useState } from 'react';
import TabSelectorMolecule2 from './TabSelectorMolecule2';
import SubastaListMolecule from './SubastaListMolecule';
import UserListMolecule from './UserListMolecule';

function ModalBuscarMolecule() {
  const [activeTab, setActiveTab] = useState("usuarios");

  const handleShowUsers = () => {
    setActiveTab("usuarios");
  };

  const handleShowSubastas = () => {
    setActiveTab("subastas");
  };

  const usuarios = [
    { id: 1, nombre: "Usuario A", foto: "profile_user.jfif" },
    { id: 2, nombre: "Usuario B", foto: "profile_user.jfif" },
    { id: 3, nombre: "Usuario C", foto: "profile_user.jfif" },
  ];

  const subastas = [
    { id: 1, titulo: "Subasta 1", descripcion: "Descripción de la subasta 1", cantidad: 100 },
    { id: 2, titulo: "Subasta 2", descripcion: "Descripción de la subasta 2", cantidad: 200 },
    { id: 3, titulo: "Subasta 3", descripcion: "Descripción de la subasta 3", cantidad: 150 },
  ];

  return (
    <div className="bg-white rounded-xl p-3 border shadow-md">
      <TabSelectorMolecule2
        activeTab={activeTab}
        handleShowUsers={handleShowUsers} 
        handleShowSubastas={handleShowSubastas} 
      />
      {activeTab === "usuarios" ? (
        <UserListMolecule data={usuarios} />
      ) : (
        <SubastaListMolecule data={subastas} />
      )}
    </div>
  );
}

export default ModalBuscarMolecule;
