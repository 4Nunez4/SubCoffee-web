import React, { useRef, useEffect, useState } from "react";
import axiosClient from "../../api/axios";
import ButtonAtom from "../atoms/ButtonAtom";
import InputWithIconAtom from "../atoms/InputWithIconAtom";
import TitleForModal from "../atoms/TitleForModal";
import toast from "react-hot-toast";
import { icono } from "../atoms/IconsAtom";

const RegisterMunicipioMolecule = ({ onClose, mode, municipioId }) => {
  const codigoDepart = useRef(null);
  const nombreMunicipioRef = useRef(null);
  const departamentoIdRef = useRef(null);
  const [departamentos, setDepartamentos] = useState([]);

  useEffect(() => {
    const fetchDepartamentos = async () => {
      try {
        const response = await axiosClient.get("/v1/departamentos");
        setDepartamentos(response.data);
      } catch (error) {
        console.error("Error fetching departamentos:", error);
        toast.error("Error al cargar la lista de departamentos");
      }
    };

    fetchDepartamentos();

    const fetchMunicipioData = async () => {
      if (mode === "update" && municipioId) {
        try {
          const response = await axiosClient.get(
            `/v1/municipios/${municipioId}`
          );
          const municipioData = response.data;

          if (municipioData) {
            nombreMunicipioRef.current = municipioData.nombre_muni || "";
            departamentoIdRef.current = municipioData.fk_departamento || "";
          }
        } catch (error) {
          console.error("Error fetching municipio data:", error);
          toast.error("Error al cargar datos del municipio");
        }
      }
    };

    fetchMunicipioData();
  }, [mode, municipioId]);

  const onSubmit = async (e) => {
    e.preventDefault();

    const data = {
      pk_codigo_depar: codigoDepart.current.value,
      nombre_muni: nombreMunicipioRef.current.value,
      fk_departamento: departamentoIdRef.current.value,
    };

    try {
      let response;
      if (mode === "create") {
        response = await axiosClient.post("/v1/municipios", data);
      } else if (mode === "update" && municipioId) {
        response = await axiosClient.put(`/v1/municipios/${municipioId}`, data);
      }

      if (response && response.status === 200) {
        toast.success("Municipio registrado/actualizado con éxito", {
          duration: 2000,
        });
        onClose();
      } else {
        toast.error("Error al registrar/actualizar el municipio");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al registrar/actualizar el municipio");
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <TitleForModal>
        {mode === "update" ? "Actualizar Municipio" : "Registrar Municipio"}
      </TitleForModal>
      <InputWithIconAtom
        icon={icono.iconoUser}
        placeholder="Nombre del Municipio"
        required
        ref={nombreMunicipioRef}
      />
      <InputWithIconAtom
        icon={icono.iconoDepartamento}
        placeholder="ID del Departamento"
        required
        ref={codigoDepart}
      />
      <select
        required
        className="border p-2 rounded"
        value={departamentoIdRef} 
        onChange={(e) => (departamentoIdRef.current = e.target.value)} 
      >
        <option value="">Seleccionar Departamento</option>
        {departamentos.map((departamento) => (
          <option
            key={departamento.pk_codigo_depar}
            value={departamento.pk_codigo_depar}
          >
            {departamento.nombre_depart}
          </option>
        ))}
      </select>
      <center>
        <ButtonAtom type="submit">
          {mode === "update" ? "Actualizar" : "Registrar"}
        </ButtonAtom>
      </center>
    </form>
  );
};

export default RegisterMunicipioMolecule;
