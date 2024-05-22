import React, { useEffect, useState } from "react";
import { Button, Input, ModalFooter } from "@nextui-org/react";

import { useDepartContext } from "../../context/DeparContext";
import { useMunicipioContext } from "../../context/MunicipioContext";
import { useVeredaContext } from "../../context/VeredaContext";
import { icono } from "../atoms/IconsAtom";

const RegisterVeredaMolecule = ({ mode, titleBtn }) => {
  const [formData, setFormData] = useState({ 
    nombre: "", 
    departamento: "", 
    municipio: "" 
  });

  const { departamentosActivos, getDepartamentosActivos } = useDepartContext();
  const { getMunisForDeparActivos, municipiosActivos, setMunicipiosForDepar } = useMunicipioContext();
  const { createVeres, updateVeres, idVereda, errors } = useVeredaContext();

  useEffect(() => {
    getDepartamentosActivos();
  }, []);

  useEffect(() => {
    if (mode === "update" && idVereda) {
      setFormData({
        nombre: idVereda.nombre_vere,
        departamento: idVereda.fk_departamento,
        municipio: idVereda.fk_municipio,
      });
      getMunisForDeparActivos(idVereda.fk_departamento)
    } else {
      setMunicipiosForDepar([])
    }
  }, [mode, idVereda]);

  const handleDepartamentoChange = (departamento) => {
    setFormData(prevData => ({ ...prevData, departamento, municipio: "" }));
    getMunisForDeparActivos(departamento);
  };

  const handleMunicipioChange = (e) => {
    const selectedMunicipio = e.target.value;
    setFormData(prevData => ({ ...prevData, municipio: selectedMunicipio }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = { 
      nombre_vere: formData.nombre, 
      fk_municipio: formData.municipio 
    };
    try {
      mode === "update" 
        ? updateVeres(idVereda.pk_id_vere, data) 
        : createVeres(data);
    } catch (error) {
      console.error("Error en el servidor:", error);
    }
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
          name="departamentoRef"
          value={formData.departamento}
          onChange={(e) => handleDepartamentoChange(e.target.value)}
          required={true}
          className="pl-8 pr-4 py-2 w-full text-sm border-2 rounded-xl border-gray-200 hover:border-gray-400 shadow-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
        >
          <option value="" hidden className="text-gray-400">
            Seleccionar Departamento
          </option>
          {departamentosActivos.map(({ pk_codigo_depar, nombre_depar }) => (
            <option key={pk_codigo_depar} value={pk_codigo_depar}>
              {nombre_depar}
            </option>
          ))}
        </select>
      </div>
      <div className="relative">
        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-800">
          {<icono.iconoMuni />}
        </span>
        <select
          name="municipioRef"
          value={formData.municipio}
          onChange={handleMunicipioChange}
          required={true}
          className="pl-8 pr-4 py-2 w-full text-sm border-2 rounded-xl border-gray-200 hover:border-gray-400 shadow-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
        >
          <option value="" hidden className="text-gray-600">
            Seleccionar Municipio
          </option>
          {municipiosActivos.length > 0 ? municipiosActivos.map(({ pk_codigo_muni, nombre_muni }) => (
            <option key={pk_codigo_muni} value={pk_codigo_muni}>
              {nombre_muni}
            </option>
          )):
          <option value="" className="text-gray-600">
            Por favor seleccionar un departemento
          </option> 
        }
        </select>
      </div>
      <Input
        label=""
        aria-label="Nombre de la vereda"
        startContent={<icono.iconoReName />}
        variant="bordered"
        placeholder="Nombre de la Vereda"
        isRequired
        value={formData.nombre}
        onChange={(e) => setFormData(prevData => ({ ...prevData, nombre: e.target.value }))}
      />
      <ModalFooter className="flex justify-center">
        <Button type="submit" className="bg-gray-600 text-white">
          {titleBtn}
        </Button>
      </ModalFooter>
    </form>
  );
};

export default RegisterVeredaMolecule;
