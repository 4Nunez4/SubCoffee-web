import React from 'react'
import AvatarAtom from "../atoms/AvatarAtom"

function UserProfileConfigMolecule({ name, email, avatarSrc })  {
    return (
      <div className="flex flex-col items-center mb-4">
        <AvatarAtom img={avatarSrc}/>
        <div className="flex flex-col">
          <p className="text-sm font-semibold">{name}</p>
          <p className="text-xs text-gray-600">{email}</p>
        </div>
      </div>
    );
  };

export default UserProfileConfigMolecule