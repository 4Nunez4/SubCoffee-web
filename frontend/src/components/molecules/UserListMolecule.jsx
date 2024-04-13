import React from 'react';
import UserItemAtom from '../atoms/UserItemAtom';

function UserListMolecule({ data }) {
  return (
    <div className="my-2">
      {data.map((user) => (
        <UserItemAtom key={user.id} user={user} />
      ))}
    </div>
  );
}

export default UserListMolecule;
