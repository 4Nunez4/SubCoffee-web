import React from 'react';
import AvatarAtom from './AvatarAtom';

function UserItemAtom({ user }) {
  return (
    <div className="flex items-center my-2">
      <AvatarAtom img={user.foto} />
      <span className="ml-2">{user.nombre}</span>
    </div>
  );
}

export default UserItemAtom;
