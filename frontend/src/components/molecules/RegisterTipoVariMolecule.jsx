import React, { useRef, useEffect } from "react";
import InputWithIconAtom from "../atoms/InputWithIconAtom";
import TitleForModal from "../atoms/TitleForModal";
import toast from "react-hot-toast";
import { icono } from "../atoms/IconsAtom";
import { Button } from "@nextui-org/react";

const RegisterTipoVariMolecule = ({ mode, title, initialData, handleSubmit, actionLabel }) => {
  const nombre_tipo_vari = useRef(null);

  useEffect(() => {
    if (mode === "update" && initialData) {
      try {
        nombre_tipo_vari.current.value = initialData.nombre_tipo_vari;
      } catch (error) {
        console.error("Error fetching Tipo de variedad data:", error);
      }
    }
  }, [mode, initialData]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        nombre_tipo_vari: nombre_tipo_vari.current.value,
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
        icon={icono.iconoReName}
        placeholder="Nombre de la Variedad"
        required
        type="text"
        ref={nombre_tipo_vari}
      />
      <center>
        <Button type="submit" className="bg-gray-600 text-white">
          {actionLabel}
        </Button>
      </center>
    </form>
  );
};

export default RegisterTipoVariMolecule;
