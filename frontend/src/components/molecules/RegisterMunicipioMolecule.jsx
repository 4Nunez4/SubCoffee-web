import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  Button,
  Input,
  ModalFooter,
} from "@nextui-org/react";

import { icono } from "../atoms/IconsAtom";
import DeparContext from "../../context/DeparContext";
import MunicipioContext from "../../context/MunicipioContext";

const RegisterMunicipioMolecule = ({ mode, onClose, titleBtn }) => {
  const [pkCodigoMuni, setPkCodigoMuni] = useState("");
  const [nombreMuni, setNombreMuni] = useState("");
  const [departamentoIdRef, setDepartamentoIdRef] = useState("");

  const { getDepartamentos, departamentos } = useContext(DeparContext);
  const { createMunis, updateMunis, idMunicipio } =
    useContext(MunicipioContext);

  useEffect(() => {
    getDepartamentos();
  }, []);

  useEffect(() => {
    if (mode === "update" && idMunicipio) {
      try {
        setPkCodigoMuni(idMunicipio.pk_codigo_muni);
        setNombreMuni(idMunicipio.nombre_muni);
        setDepartamentoIdRef(idMunicipio.fk_departamento);
      } catch (error) {
        console.error("Error fetching departamento data:", error);
        toast.error("Error al cargar datos del municipio");
      }
    }
  }, [mode, idMunicipio]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = {
      pk_codigo_muni: pkCodigoMuni,
      nombre_muni: nombreMuni,
      fk_departamento: departamentoIdRef,
    };

    try {
      if (mode === "update") {
        updateMunis(idMunicipio.pk_codigo_muni, data);
      } else {
        createMunis(data);
      }
      onClose();
    } catch (error) {
      console.error("Error en el servidor:", error);
      toast.error("Error en el servidor " + error);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 px-4">
      <Input
        label=""
        aria-label="Codigo del Municipio"
        variant="bordered"
        startContent={<icono.iconoNumber />}
        placeholder="Codigo del Municipio"
        isRequired
        value={pkCodigoMuni}
        onChange={(e) => setPkCodigoMuni(e.target.value)}
      />
      <Input
        label=""
        aria-label="Nombre del Municipio"
        variant="bordered"
        startContent={<icono.iconoReName />}
        placeholder="Nombre del Municipio"
        isRequired
        value={nombreMuni}
        onChange={(e) => setNombreMuni(e.target.value)}
      />
      <div className="relative">
        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-800">
          {<icono.iconoDepar />}
        </span>
        <select
          name="departamentoIdRef"
          value={departamentoIdRef}
          onChange={(e) => setDepartamentoIdRef(e.target.value)}
          required={true}
          className="pl-8 pr-4 py-2 w-full text-sm border-2 rounded-xl border-gray-200 hover:border-gray-400 shadow-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
        >
          <option value="" hidden className="text-gray-400">
            Seleccionar Departamento
          </option>
          {departamentos.filter((departamento) => departamento.estado_depar === "activo").map((departamento) => (
              <option
                key={departamento.pk_codigo_depar}
                value={departamento.pk_codigo_depar}
              >
                {departamento.nombre_depar}
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

export default RegisterMunicipioMolecule;
