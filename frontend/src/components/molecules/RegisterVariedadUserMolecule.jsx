import React, { useContext, useEffect, useState } from "react";
import { Button, ModalFooter } from "@nextui-org/react";

import { icono } from "../atoms/IconsAtom";
import FincaContext from "../../context/FincaContext";
import VariedadUserContext from "../../context/VariedadUserContext";
import TipoVariContext from "../../context/TipoVariContext";

const RegisterVariedadUserMolecule = ({ mode, onClose, titleBtn }) => {
  const [formData, setFormData] = useState({
    tipoVariRef: "",
    descripcion_vari: ""
  });

  const users = JSON.parse(localStorage.getItem("user"));

  const { getFinca, fincas } = useContext(FincaContext)
  const { idVariedad, createVaris, updateVaris, errors } = useContext(VariedadUserContext)
  const { getTipoVariedades, tipoVariedades } = useContext(TipoVariContext)

  useEffect(()=> {
    getTipoVariedades()
  }, [])

  useEffect(() => {
    getFinca(users.pk_cedula_user)
  }, [])
  
  useEffect(() => {
    if (mode === "update" && idVariedad) {
      try {
        setFormData({
          ...formData,
          tipoVariRef: idVariedad.fk_tipo_variedad,
          fincasRef: idVariedad.fk_finca
        });
      } catch (error) {
        console.error("Error en el sistema:", error);
      }
    }
  }, [mode, idVariedad]);


  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("fk_finca", formData.fincasRef);
      data.append("fk_tipo_variedad", formData.tipoVariRef);

      if (mode === "update") {
        updateVaris(idVariedad.pk_id_vari, data, users.pk_cedula_user)
      } else {
        createVaris(data, users.pk_cedula_user)
      }
    } catch (error) {
      console.error("Error del sistema:", error);
    }
  };

  const handleChange = (e, fieldName) => {
    const { name, value, files } = e.target;
    const newValue = name === "imagen" ? files[0] : value;
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: newValue
    }));
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
      <div className="relative">
        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-800">
          {<icono.iconoDepar />}
        </span>
        <select
          name="tipoVariRef"
          value={formData.tipoVariRef}
          onChange={(e) => handleChange(e, "tipoVariRef")}
          required={true}
          className="pl-8 pr-4 py-2 w-full text-sm border-2 rounded-xl border-gray-200 hover:border-gray-400 shadow-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
        >
          <option value="" hidden className="text-gray-400">
            Seleccionar Variedad
          </option>
          {tipoVariedades.filter((variedad) => variedad.estado_tipo_vari === "activo").map((variedad) => (
            <option
              key={variedad.pk_id_tipo_vari}
              value={variedad.pk_id_tipo_vari}
            >
              {variedad.nombre_tipo_vari}
            </option>
          ))}
        </select>
      </div>
      <ModalFooter className="flex justify-center">
        <Button type="submit" className="bg-gray-600 text-white">
          {titleBtn}
        </Button>
      </ModalFooter>
    </form>
  );
};

export default RegisterVariedadUserMolecule;
