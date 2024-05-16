import React, { useState, useEffect, useContext } from "react";
import { Button, Input, ModalFooter } from "@nextui-org/react";

import { icono } from "../atoms/IconsAtom";
import DeparContext from "../../context/DeparContext";

const RegisterDepartMolecule = ({ mode, titleBtn, onClose }) => {
  const [formData, setFormData] = useState({
    pk_codigo_depar: "",
    nombre_depar: "",
  });
  const { idDepartamento, createDepartamento, updateDepartamento, errors } = useContext(DeparContext);

  useEffect(() => {
    if (mode === "update" && idDepartamento) {
      setFormData({
        pk_codigo_depar: idDepartamento.pk_codigo_depar,
        nombre_depar: idDepartamento.nombre_depar,
      });
    }
  }, [mode, idDepartamento]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === "update") {
        await updateDepartamento(idDepartamento.pk_codigo_depar, formData);
      } else {
        await createDepartamento(formData);
      }
      // onClose()
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 px-4">
      {
        errors.map((error, i) => (
          <div className='bg-red-500 p-2 text-white text-center my-2' key={i}>
            {error}
          </div>
        ))
      }
      <Input
        type="number"
        name="pk_codigo_depar"
        placeholder="Código del Departamento"
        labelPlacement="outside"
        startContent={<icono.iconoNumber />}
        variant="bordered"
        min={0}
        required={true}
        value={formData.pk_codigo_depar}
        onChange={handleChange}
      />
      <Input
        name="nombre_depar"
        labelPlacement="outside"
        startContent={<icono.iconoDepar />}
        variant="bordered"
        required={true}
        type="text"
        placeholder="Nombre del Departamento"
        value={formData.nombre_depar}
        onChange={handleChange}
      />
      <ModalFooter className="flex justify-center">
        <Button type="submit" className="bg-gray-600 text-white">
          {titleBtn}
        </Button>
      </ModalFooter>
    </form>
  );
};

export default RegisterDepartMolecule;
