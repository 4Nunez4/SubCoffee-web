import React from "react";
import ConfigButtonGroupMolecule from "../molecules/ConfigButtonGroupMolecule";
import UserProfileConfigMolecule from "../molecules/UserProfileConfigMolecule";

function NavbarConfiguration() {
  const user = [
    { name: "Juan Camilo", email: "juan@gmail.com", img: "profile_user.jfif" },
  ];

  const buttons = [
    { text: "Mi cuenta", onClick: () => {} },
    { text: "Acceso y seguridad", onClick: () => {} },
    { text: "Configuración de privacidad", onClick: () => {} },
    { text: "Términos y condiciones", onClick: () => {} },
  ];

  return (
    <div className="flex flex-col w-64 bg-blancoMedio p-4 shadow-md">
      <UserProfileConfigMolecule
        name={user.name}
        email={user.email}
        avatarSrc={user.img}
      />
      <ConfigButtonGroupMolecule buttons={buttons} />
    </div>
  );
}

export default NavbarConfiguration;
