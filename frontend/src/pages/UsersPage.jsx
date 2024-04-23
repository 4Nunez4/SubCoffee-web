import React, { useEffect, useState } from "react";
import UsersListOrganism from "../components/organisms/UsersListOrganism";
import { icono } from "../components/atoms/IconsAtom";
import IconHeaderAtom from "../components/atoms/IconHeaderAtom";
import axiosClient from "../api/axios";

function UsersPage() {
  const handle = () => {
    e.preventDefault();
    console.log("hello");
  };

  const [users, setusers] = useState([]);

  if (!users) {
    return <div className="text-red-500">No hay usuarios registrados...</div>;
  }

  useEffect(() => {
    axiosClient.get("/v1/users").then((res) => {
        console.log(res.data);
        setusers(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="max-w-72 mx-auto p-4">
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-xl font-bold">Usuarios</h1>
        <IconHeaderAtom onClick={handle}>
          <icono.iconoBuscar className="h-5 w-5 text-negro" />
        </IconHeaderAtom>
      </div>
      <UsersListOrganism users={users} />
    </div>
  );
}

export default UsersPage;
