import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import InputWithIconAtom from "../atoms/InputWithIconAtom";
import TextTareaAtom from "../atoms/TextTareaAtom";
import { icono } from "../atoms/IconsAtom";
import { Button, Select, SelectItem } from "@nextui-org/react";
import TitleForModal from "../atoms/TitleForModal";
import axiosClient from "../../api/axios";

const RegisterFincaMolecule = ({
  mode,
  initialData,
  handleSubmit,
  actionLabel,
}) => {
  const nombreFincaRef = useRef(null);
  const imagenRef = useRef(null);
  const descripcionRef = useRef(null);

  const [departamentos, setDepartamentos] = useState([]);
  const [departamentosRef, setDepartamentosRef] = useState("");
  const [municipios, setMunicipios] = useState([]);
  const [municipiosRef, setMunicipiosRef] = useState("");
  const [veredas, setVeredas] = useState([]);
  const [veredasRef, setVeredasRef] = useState("");

  const storedUser = localStorage.getItem("user");
  const users = storedUser ? JSON.parse(storedUser) : null;

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
  }, []);

  const fetchMunicipios = async (departamentos) => {
    try {
      const response = await axiosClient.get(`/v1/municipiosdep/${departamentos}`);
      setMunicipios(response.data);
    } catch (error) {
      console.error("Error fetching municipios:", error);
      toast.error("Error al cargar la lista de municipios");
    }
  };

  const fetchVeredas = async (veredas) => {
    try {
      const response = await axiosClient.get(`/v1/veredasmun/${veredas}`)
      setVeredas(response.data)
    } catch (error) {
      console.error("Error fetching veredas:", error);
      toast.error("Error al cargar la lista de veredas");
    }
  }

  const handleDepartamentoChange = (e) => {
    const selectedDepartamentoId = e.target.value;
    setDepartamentosRef(selectedDepartamentoId);
    fetchMunicipios(selectedDepartamentoId);
  };

  const handleMunicipio = (e) => {
    const selectedMunicipioId = e.target.value
    setMunicipiosRef(selectedMunicipioId)
    fetchVeredas(selectedMunicipioId)
  }

  if (mode === "update" && initialData) {
    try {
      descripcionRef.current = initialData.descripcion_fin;
      setVeredasRef(initialData.fk_finca);
    } catch (error) {
      toast.error("Error setting initial data:", error);
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("nombre_fin", nombreFincaRef.current.value);
      formData.append("imagen_fin", imagenRef.current.files[0]);
      formData.append("descripcion_fin", descripcionRef.current.value);
      formData.append("fk_id_usuario", users.pk_cedula_user);
      formData.append("fk_vereda", veredasRef);

      handleSubmit(formData, e);
    } catch (error) {
      toast.error("Error del sistema:", error);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 p-4">
      <TitleForModal>
        {mode === "update" ? "Actualizar Finca" : "Registrar Finca"}
      </TitleForModal>
      <InputWithIconAtom
        icon={icono.iconoNamePropiedad}
        placeholder="Nombre de la Finca"
        required
        type="text"
        ref={nombreFincaRef}
      />
      <InputWithIconAtom
        icon={icono.iconoPush}
        placeholder="Imagen"
        required
        type="file"
        ref={imagenRef}
      />
      <div className="flex">
        <Select
          label="Departamento"
          value={departamentosRef}
          variant="bordered"
          popoverProps={{
            classNames: {
              base: "before:bg-default-200",
              content: "p-0 border-small border-divider bg-background",
            },
          }}
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
          label="Municipio"
          value={municipiosRef}
          variant="bordered"
          popoverProps={{
            classNames: {
              base: "before:bg-default-200",
              content: "p-0 border-small border-divider bg-background",
            },
          }}
          onChange={handleMunicipio}
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
      </div>
      <Select
        label="Vereda"
        value={veredasRef}
        variant="bordered"
        popoverProps={{
          classNames: {
            base: "before:bg-default-200",
            content: "p-0 border-small border-divider bg-background",
          },
        }}
        onChange={(e) => setVeredasRef(e.target.value)}
      >
        {veredas.filter((vereda) => vereda.estado_vere === "activo").map((vereda) => (
            <SelectItem 
              key={vereda.pk_id_vere} 
              value={vereda.pk_id_vere}
            >
              {vereda.nombre_vere}
            </SelectItem>
          ))}
      </Select>
      <TextTareaAtom
        icon={icono.iconoDescript}
        ref={descripcionRef}
      ></TextTareaAtom>
      <center>
        <Button type="submit" color="primary">
          {actionLabel}
        </Button>
      </center>
    </form>
  );
};

export default RegisterFincaMolecule;
