import React, { useRef, useEffect } from "react";
import InputWithIconAtom from "../atoms/InputWithIconAtom";
import TitleForModal from "../atoms/TitleForModal";
import toast from "react-hot-toast";
import { icono } from "../atoms/IconsAtom";
import { Button } from "@nextui-org/react";

const RegisterDepartMolecule = ({ mode, title, initialData, handleSubmit, actionLabel }) => {
  const pk_codigo_depar = useRef(null);
  const nombre_depar = useRef(null);

  useEffect(() => {
    if (mode === "update" && initialData) {
      try {
        console.log(initialData);
        pk_codigo_depar.current.value = initialData.pk_codigo_depar;
        nombre_depar.current.value = initialData.nombre_depar;
      } catch (error) {
        console.error("Error fetching departamento data:", error);
      }
    }
  }, [mode, initialData]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        pk_codigo_depar: pk_codigo_depar.current.value,
        nombre_depar: nombre_depar.current.value,
      };
      handleSubmit(data, e);
    } catch (error) {
      console.log(error);
      toast.success("Error en el servidor " + error);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 p-4">
      <TitleForModal>
        {title}
      </TitleForModal>
      <InputWithIconAtom
        icon={icono.iconoNumber}
        placeholder="Código del Departamento"
        required
        type="text"
        ref={pk_codigo_depar}
      />
      <InputWithIconAtom
        icon={icono.iconoReName}
        placeholder="Nombre del Departamento"
        required
        type="text"
        ref={nombre_depar}
      />
      <center>
       <Button type="submit" className="bg-gray-600 text-white">
          {actionLabel}
        </Button>
      </center>
    </form>
  );
};

export default RegisterDepartMolecule;
