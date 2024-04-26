import React, { useRef, useEffect, useState } from "react";
import axiosClient from "../../api/axios";
import InputWithIconAtom from "../atoms/InputWithIconAtom";
import TitleForModal from "../atoms/TitleForModal";
import toast from "react-hot-toast";
import { icono } from "../atoms/IconsAtom";
import { Button, Select, SelectItem } from "@nextui-org/react";

const RegisterVeredaMolecule = ({ mode, initialData, handleSubmit, actionLabel }) => {
  const nombreVeredaRef = useRef(null);
  const [municipios, setMunicipios] = useState([]);
  const [municipiosRef, setMunicipiosRef] = useState(""); // Inicializa como una cadena vacía

  useEffect(() => {
    const fetchMunicipios = async () => {
      try {
        const response = await axiosClient.get("/v1/municipios");
        setMunicipios(response.data);
      } catch (error) {
        console.error("Error fetching municipios:", error);
        toast.error("Error al cargar la lista de municipios");
      }
    };
    fetchMunicipios();

    if (mode === "update" && initialData) {
      try {
        if (initialData) {
          nombreVeredaRef.current.value = initialData.nombre_vere; // Asigna el valor al input
          setMunicipiosRef(initialData.fk_municipio); // Asigna el valor al estado de referencia
        }
      } catch (error) {
        toast.error("Error en el servidor:", error);
      }
    }
  }, [mode, initialData]);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        nombre_vere: nombreVeredaRef.current.value, // Accede al valor del input
        fk_municipio: municipiosRef, // Usa directamente el estado de referencia
      };
      handleSubmit(data, e);
    } catch (error) {
      console.log(error);
      alert("Error en el servidor " + error);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 p-4">
      <TitleForModal>
        {mode === "update" ? "Actualizar Vereda" : "Registrar Vereda"}
      </TitleForModal>
      <InputWithIconAtom
        icon={icono.iconoUser}
        placeholder="Nombre de la Vereda"
        required
        ref={nombreVeredaRef}
      />
      <Select
        label="Vereda"
        value={municipiosRef}
        onChange={(e) => setMunicipiosRef(e.target.value)}
      >
        {municipios
          .filter((municipio) => municipio.estado_muni === "activo")
          .map((municipio) => (
            <SelectItem
              key={municipio.pk_codigo_muni}
              value={municipio.pk_codigo_muni}
            >
              {municipio.nombre_muni}
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

export default RegisterVeredaMolecule;
