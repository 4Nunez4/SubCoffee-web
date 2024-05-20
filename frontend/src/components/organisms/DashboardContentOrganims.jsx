import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LinkButtonAtom from "../atoms/LinkButtonAtom";
import TiposDeCafeOrganism from "./TiposDeCafeOrganism";

function DashboardContentOrganims() {
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      navigate("/subcoffee");
    }
  }, [navigate]);

  return (
    <div>
      <div className="flex items-center justify-center px-12">
        <span className="text-black text-4xl text-center">
          Bienvenido a Subcoffee una plataforma online donde te podras conectar
          con diferentes usuarios para subastar y pujar por café de alta calidad
        </span>
        <img src="./src/assets/dashboard.png" />
      </div>
      <div className="w-full py-12">
        <p className="text-center text-4xl font-semibold">
          Una plataforma de café perfecta para todos
        </p>
        <p className="text-lg font-semibold mt-8 text-center">
          Subasta o puja por el café de tu gusto.
        </p>
        <TiposDeCafeOrganism />
      </div>
      <div className="w-full grid grid-cols-2 justify-center p-12 gap-x-4 items-center">
        <div className="px-12">
          <h2 className="text-3xl font-semibold my-4">Crear subasta</h2>
          <p className="text-gray-700">
            Crea una subasta con el tipo de café de tu preferencia, agrega la
            descripción del mismo e información que llame la atención de los
            demás. Asi, Los usuarios podrán verlo e interesarse en él. Puede ser
            un café clásico, exótico o una mezcla única que quieras ofrecer al
            mundo.
          </p>
          <div className="flex gap-x-8 mt-8">
            <LinkButtonAtom to="/subcoffee">Crear subasta</LinkButtonAtom>
            <LinkButtonAtom to="/ayuda">Como subastar</LinkButtonAtom>
          </div>
        </div>
        <div className="w-10/12">
          <img src="./src/assets/crearsubasta.jpg" alt="" className="w-lvw mr-32 rounded-3xl" />
        </div>
      </div>
      <div className="w-full grid grid-cols-2 justify-center p-12 gap-x-4 items-center">
        <div className="w-11/12">
          <img src="./src/assets/comunidadfeliz.avif" alt="" className="mx-auto rounded-3xl" />
        </div>
        <div className="px-12">
          <h2 className="text-3xl font-semibold my-4">Pujar Por Una Subasta</h2>
          <p className="text-gray-700">
            Crea una subasta con el tipo de café de tu preferencia, agrega la
            descripción del mismo e información que llame la atención de los
            demás. Asi, Los usuarios podrán verlo e interesarse en él. Puede ser
            un café clásico, exótico o una mezcla única que quieras ofrecer al
            mundo.
          </p>
          <div className="flex gap-x-8 mt-8">
            <LinkButtonAtom to="/subcoffee">Empezar Puja</LinkButtonAtom>
            <LinkButtonAtom to="/ayuda">Como Pujar</LinkButtonAtom>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardContentOrganims;
