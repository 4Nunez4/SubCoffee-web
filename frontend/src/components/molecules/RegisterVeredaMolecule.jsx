import React, { useRef, useEffect, useState } from "react";
import axiosClient from "../../api/axios";
import ButtonAtom from "../atoms/ButtonAtom";
import InputWithIconAtom from "../atoms/InputWithIconAtom";
import TitleForModal from "../atoms/TitleForModal";
import toast from "react-hot-toast";
import { icono } from "../atoms/IconsAtom";

const RegisterVeredaMolecule = ({ onClose, mode, veredaId }) => {
  const nombreVeredaRef = useRef(null);
  const municipioIdRef = useRef(null);
  const [municipios, setMunicipios] = useState([]);

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

    const fetchVeredaData = async () => {
      if (mode === "update" && veredaId) {
        try {
          const response = await axiosClient.get(`/v1/veredas/${veredaId}`);
          const veredaData = response.data;

          if (veredaData) {
            nombreVeredaRef.current = veredaData.nombre_vere || "";
            municipioIdRef.current = veredaData.fk_municipio || "";
          }
        } catch (error) {
          console.error("Error fetching vereda data:", error);
          toast.error("Error al cargar datos de la vereda");
        }
      }
    };

    fetchVeredaData();
  }, [mode, veredaId]);

  const onSubmit = async (e) => {
    e.preventDefault();

    const data = {
      nombre_vere: nombreVeredaRef.current,
      fk_municipio: municipioIdRef.current,
    };

    try {
      let response;
      if (mode === "create") {
        response = await axiosClient.post("/v1/veredas", data);
      } else if (mode === "update" && veredaId) {
        response = await axiosClient.put(`/v1/veredas/${veredaId}`, data);
      }

      if (response && response.status === 200) {
        toast.success("Vereda registrada/actualizada con éxito", {
          duration: 2000,
        });
        onClose();
      } else {
        toast.error("Error al registrar/actualizar la vereda");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al registrar/actualizar la vereda");
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <TitleForModal>
        {mode === "update" ? "Actualizar Vereda" : "Registrar Vereda"}
      </TitleForModal>
      <InputWithIconAtom
        icon={icono.iconoUser}
        placeholder="Nombre de la Vereda"
        required
        ref={nombreVeredaRef}
      />
      <select
        required
        className="border p-2 rounded"
        value={municipioIdRef}
        onChange={(e) => (municipioIdRef.current = e.target.value)}
      >
        <option value="">Seleccionar Municipio</option>
        {municipios.map((municipio) => (
          <option
            key={municipio.pk_codigo_muni}
            value={municipio.pk_codigo_muni}
          >
            {municipio.nombre_muni}
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

export default RegisterVeredaMolecule;
