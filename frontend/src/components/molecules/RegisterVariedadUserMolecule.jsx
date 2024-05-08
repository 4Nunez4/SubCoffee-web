import React, { useEffect, useRef, useState } from "react";
import TitleForModal from "../atoms/TitleForModal";
import InputWithIconAtom from "../atoms/InputWithIconAtom";
import { icono } from "../atoms/IconsAtom";
import { Button, Select, SelectItem } from "@nextui-org/react";
import axiosClient from "../../api/axios";
import toast from "react-hot-toast";

const RegisterVariedadUserMolecule = ({ mode, initialData, handleSubmit, actionLabel }) => {
  const descripcionVariRef = useRef(null);
  const imagenVariRef = useRef(null);

  const [fincas, setFincas] = useState([]);
  const [fincasRef, setFincasRef] = useState("");
  const [tipoVariedades, setTipoVariedades] = useState([]);
  const [tipoVariRef, setTipoVariRef] = useState("");

  const storedUser = localStorage.getItem("user");
  const users = storedUser ? JSON.parse(storedUser) : null;

  useEffect(() => {
    const fetchFincas = async () => {
      try {
        const response = await axiosClient.get(`/v1/finca/${users.pk_cedula_user}`);
        setFincas(response.data.data);
      } catch (error) {
        toast.error("Error fetching fincas:", error);
      }
    };

    const fetchTipoVariedades = async () => {
      try {
        const response = await axiosClient.get("/v1/tipo_vari");
        setTipoVariedades(response.data.data);
      } catch (error) {
        toast.error("Error fetching tipo variedades:", error);
      }
    };

    fetchFincas();
    fetchTipoVariedades();

    if (mode === "update" && initialData) {
      try {
        descripcionVariRef.current = initialData.descripcion_vari;
        setTipoVariRef(initialData.fk_tipo_variedad);
        setFincasRef(initialData.fk_finca);
      } catch (error) {
        toast.error("Error en el sistema:", error);
      }
    }
  }, [mode, initialData]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("descripcion_vari", descripcionVariRef.current.value);
      formData.append("img", imagenVariRef.current?.files[0]);
      formData.append("fk_finca", fincasRef);
      formData.append("fk_tipo_variedad", tipoVariRef);
  
      handleSubmit(formData, e);
    } catch (error) {
      toast.error("Error del sistema:", error);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 p-4">
      <TitleForModal>
        {mode === "update"
          ? "Actualizar Tipo Variedad"
          : "Registrar Tipo Variedad"}
      </TitleForModal>
      <InputWithIconAtom
        icon={icono.iconoDescript}
        placeholder="Descripción"
        required
        type="text"
        ref={descripcionVariRef}
      />
      <InputWithIconAtom
        icon={icono.iconoPush}
        placeholder="Imagen"
        type="file"
        ref={imagenVariRef}
      />
      <Select
        label="Finca"
        value={fincasRef}
        variant="bordered"
        popoverProps={{
          classNames: {
            base: "before:bg-default-200",
            content: "p-0 border-small border-divider bg-background",
          },
        }}
        onChange={(e) => setFincasRef(e.target.value)}
      >
        {fincas.filter((finca) => finca.estado_fin === "activo").map((finca) => (
          <SelectItem key={finca.pk_id_fin} value={finca.pk_id_fin}>
            {finca.nombre_fin}
          </SelectItem>
        ))}
      </Select>
      <Select
        label="Tipo Variedad"
        value={tipoVariRef}
        variant="bordered"
        popoverProps={{
          classNames: {
            base: "before:bg-default-200",
            content: "p-0 border-small border-divider bg-background",
          },
        }}
        onChange={(e) => setTipoVariRef(e.target.value)}
      >
        {tipoVariedades.filter((tipo) => tipo.estado_tipo_vari === "activo").map((tipo) => (
          <SelectItem key={tipo.pk_id_tipo_vari} value={tipo.pk_id_tipo_vari}>
            {tipo.nombre_tipo_vari }
          </SelectItem>
        ))}
      </Select>
      <center>
        <Button type="submit" color="primary">
          {actionLabel}
        </Button>
      </center>
    </form>
  );
};

export default RegisterVariedadUserMolecule;
