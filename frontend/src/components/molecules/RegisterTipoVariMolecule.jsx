import React, { useState, useEffect, useContext } from "react";
import { icono } from "../atoms/IconsAtom";
import { Button, Input, ModalFooter } from "@nextui-org/react";
import TipoVariContext from "../../context/TipoVariContext";

const RegisterTipoVariMolecule = ({ mode, onClose, titleBtn }) => {
  const [formData, setFormData] = useState({
    nombre_tipo_vari: "",
  });

  const { idTipoVariedad, createTipoVariedades, updateTipoVariedades } = useContext(TipoVariContext);

  useEffect(() => {
    if (mode === "update" && idTipoVariedad) {
      try {
        setFormData({
          ...formData,
          nombre_tipo_vari: idTipoVariedad.nombre_tipo_vari,
        });
      } catch (error) {
        console.error("Error fetching Tipo de variedad data:", error);
      }
    }
  }, [mode, idTipoVariedad]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === "update") {
        updateTipoVariedades(idTipoVariedad.pk_id_tipo_vari, formData)
      } else {
        createTipoVariedades(formData)
      }
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 px-4">
      <Input
        label=""
        aria-label="Nombre de la Variedad"
        startContent={<icono.iconoReName />}
        placeholder="Nombre de la Variedad"
        variant="bordered"
        isRequired
        type="text"
        value={formData.nombre_tipo_vari}
        name="nombre_tipo_vari"
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

export default RegisterTipoVariMolecule;
