import { useEffect, useRef, useState } from "react";
import TitleForModal from "../atoms/TitleForModal";
import toast from "react-hot-toast";
import InputWithIconAtom from "../atoms/InputWithIconAtom";
import { Button, Select, SelectItem } from "@nextui-org/react";
import { icono } from "../atoms/IconsAtom";
import axiosClient from "../../api/axios";

const RegisterMunicipioMolecule = ({ mode, title, initialData, handleSubmit, actionLabel }) => {
  const pk_codigo_muni = useRef(null);
  const nombre_muni = useRef(null);
  const [departamentoIdRef, setDepartamentoIdRef] = useState("");
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
    if (mode === "update" && initialData) {
      try {
        pk_codigo_muni.current.value = initialData.pk_codigo_muni;
        nombre_muni.current.value = initialData.nombre_muni;
        setDepartamentoIdRef(initialData.fk_departamento);
      } catch (error) {
        console.error("Error fetching departamento data:", error);
        toast.error("Error al cargar datos del municipio");
      }
    }
  }, [mode, initialData]);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        pk_codigo_muni: pk_codigo_muni.current.value,
        nombre_muni: nombre_muni.current.value,
        fk_departamento: departamentoIdRef,
      };
      handleSubmit(data, e);
    } catch (error) {
      console.error("Error en el servidor:", error);
      toast.error("Error en el servidor " + error);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 p-4">
      <TitleForModal>
        {title}
      </TitleForModal>
      <InputWithIconAtom
        icon={icono.iconoNumber}
        placeholder="Codigo del Municipio"
        required
        ref={pk_codigo_muni}
      />
      <InputWithIconAtom
        icon={icono.iconoReName}
        placeholder="Nombre del Municipio"
        required
        ref={nombre_muni}
      />
      <Select
        label=""
        className="max-w-sm"
        variant="bordered"
        placeholder="Seleccionar Departamento"
        startContent={<icono.iconoDepar />}
        value={departamentoIdRef}
        onChange={(e) => setDepartamentoIdRef(e.target.value)}
        aria-label="Seleccionar Departamento"
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
      <center>
        <Button type="submit" className="bg-gray-600 text-white">
          {actionLabel}
        </Button>
      </center>
    </form>
  );
};

export default RegisterMunicipioMolecule;
