import React, { useRef, useEffect, useState } from "react";
import axiosClient from "../../api/axios";
import InputWithIconAtom from "../atoms/InputWithIconAtom";
import TitleForModal from "../atoms/TitleForModal";
import toast from "react-hot-toast";
import { icono } from "../atoms/IconsAtom";
import { Button, Select, SelectItem } from "@nextui-org/react";

const RegisterVeredaMolecule = ({ mode, title, initialData, handleSubmit, actionLabel }) => {
  const nombreVeredaRef = useRef(null);
  const [municipios, setMunicipios] = useState([]);
  const [municipiosRef, setMunicipiosRef] = useState("");
  const [departamentos, setDepartamentos] = useState([]);
  const [departamentosRef, setDepartamentosRef] = useState('');

  useEffect(() => {
    const fetchDepar = async () => {
      try {
        const response = await axiosClient.get("/v1/departamentos");
        setDepartamentos(response.data);
      } catch (error) {
        console.error("Error fetching departamentos:", error);
        toast.error("Error al cargar la lista de departamentos");
      }
    };
    fetchDepar();
    if (mode === "update" && initialData) {
      try {
        nombreVeredaRef.current.value = initialData.nombreVeredaRef;
        setMunicipiosRef(initialData.fk_departamento);
      } catch (error) {
        console.error("Error fetching departamento data:", error);
        toast.error("Error al cargar datos del municipio");
      }
    }
  }, [mode, initialData]);

  const fetchMunicipios = async (departamentos) => {
    try {
      const response = await axiosClient.get(`/v1/municipiosdep/${departamentos}`);
      setMunicipios(response.data);
    } catch (error) {
      console.error("Error fetching municipios:", error);
      toast.error("Error al cargar la lista de municipios");
    }
  };

  const handleDepartamentoChange = (e) => {
    const selectedDepartamentoId = e.target.value;
    setDepartamentosRef(selectedDepartamentoId);
    fetchMunicipios(selectedDepartamentoId);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        nombre_vere: nombreVeredaRef.current.value,
        fk_municipio: municipiosRef,
      };
      handleSubmit(data, e);
    } catch (error) {
      console.error("Error en el servidor:", error);
      toast.error("Error en el servidor");
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 p-4">
      <TitleForModal>
        {title}
      </TitleForModal>
      <Select
        label=""
        placeholder="Seleccionar Departamento"
        value={departamentosRef}
        startContent={<icono.iconoDepar />}
        variant="bordered"
        aria-label="Seleccionar Departamento"
        onChange={handleDepartamentoChange}
      >
        {departamentos.filter((departamento) => departamento.estado_depar === "activo").map((departamento) => (
          <SelectItem
            key={departamento.pk_codigo_depar}
            value={departamento.pk_codigo_depar}
          >
            {departamento.nombre_depar}
          </SelectItem>
        ))}
      </Select>
      <Select
        label=""
        placeholder="Seleccionar Municipio"
        value={municipiosRef}
        variant="bordered"
        startContent={<icono.iconoMuni />}
        aria-label="Seleccionar Municipio"
        onChange={(e) => setMunicipiosRef(e.target.value)}
      >
        {municipios.filter((municipio) => municipio.estado_muni === "activo").map((municipio) => (
          <SelectItem
            key={municipio.pk_codigo_muni}
            value={municipio.pk_codigo_muni}
          >
            {municipio.nombre_muni}
          </SelectItem>
        ))}
      </Select>
      <InputWithIconAtom
        icon={icono.iconoReName}
        placeholder="Nombre de la Vereda"
        required
        ref={nombreVeredaRef}
      />
      <center>
        <Button type="submit" className="bg-gray-600 text-white">
          {actionLabel}
        </Button>
      </center>
    </form>
  );
};

export default RegisterVeredaMolecule;
