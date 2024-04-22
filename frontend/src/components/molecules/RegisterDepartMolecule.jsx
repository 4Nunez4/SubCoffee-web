import React, { useRef, useEffect } from "react";
import InputWithIconAtom from "../atoms/InputWithIconAtom";
import TitleForModal from "../atoms/TitleForModal";
import toast from "react-hot-toast";
import { icono } from "../atoms/IconsAtom";
import { Button } from "@nextui-org/react";

const RegisterDepartMolecule = ({ mode, initialData, handleSubmit, actionLabel }) => {
  const codigoDepartamento = useRef(null);
  const nombreDepartamento = useRef(null);

  useEffect(() => {
    if (mode === "update" && initialData) {
      try {
          console.log(initialData);

          codigoDepartamento.current.value = initialData.pk_codigo_depar
          nombreDepartamento.current.value = initialData.nombre_depar
        } catch (error) {
          console.error("Error fetching departamento data:", error);
        }
      }

  }, [mode, initialData]);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
    const data = {
      pk_codigo_depar: codigoDepartamento.current.value,
      nombre_depar: nombreDepartamento.current.value,
    };
    handleSubmit(data,e)
  } catch (error) {
    console.log(error);
    toast.success("Error en el servidor " + error);
  }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 p-4">
      <TitleForModal>
        {mode === "update"
          ? "Actualizar Departamento"
          : "Registrar Departamento"}
      </TitleForModal>
      <InputWithIconAtom
        icon={icono.iconoCampana}
        placeholder="Código del Departamento"
        required
        type="text"
        ref={codigoDepartamento}
      />
      <InputWithIconAtom
        icon={icono.iconoUser}
        placeholder="Nombre del Departamento"
        required
        type="text"
        ref={nombreDepartamento}
      />
      <center>
        <Button type="submit" color="primary">
          {actionLabel}
        </Button>
      </center>
    </form>
  );
};

export default RegisterDepartMolecule;
