import React from "react";
import UserCardMolecule from "../molecules/UserCardMolecule";

const UsersListOrganism = ({ users }) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-1">
      {users.map((user, index) => (
        <UserCardMolecule key={index} user={user} index={index} />
      ))}
    </div>
  );
};

export default UsersListOrganism;
