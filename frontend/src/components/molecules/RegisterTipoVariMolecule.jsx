import React, { useState, useEffect } from "react";
import { icono } from "../atoms/IconsAtom";
import { Button, Input, ModalFooter } from "@nextui-org/react";
import { useTipoVariContext } from "../../context/TipoVariContext";

const RegisterTipoVariMolecule = ({ mode, titleBtn }) => {
  const [formData, setFormData] = useState({
    nombre_tipo_vari: "",
  });

  const { idTipoVariedad, createTipoVariedades, updateTipoVariedades, errors } = useTipoVariContext();

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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 px-4">
      {errors.map((error, i) => (
          <div className='bg-red-500 p-2 text-white text-center my-2' key={i}>
            {error}
          </div>
        ))
      }  
      <Input
        label=""
        aria-label="Nombre de la Variedad"
        startContent={<icono.iconoReName />}
        placeholder="Nombre de la Variedad"
        variant="bordered"
        required
        type="text"
        value={formData.nombre_tipo_vari}
        name="nombre_tipo_vari"
        onChange={handleChange}
      />
      <ModalFooter className="flex justify-center">
        <Button
          type="submit"
          className="px-4 bg-[#001e2b] text-white font-semibold rounded-md"
        >
          {titleBtn}
        </Button>
      </ModalFooter>
    </form>
  );
};

export default RegisterTipoVariMolecule;
