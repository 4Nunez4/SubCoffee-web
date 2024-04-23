import React, { useRef, useEffect, useState } from "react";
import axiosClient from "../../api/axios";
import ButtonAtom from "../atoms/ButtonAtom";
import InputWithIconAtom from "../atoms/InputWithIconAtom";
import TitleForModal from "../atoms/TitleForModal";
import toast from "react-hot-toast";
import { icono } from "../atoms/IconsAtom";

const RegisterTipoVariMolecule = ({ onClose, mode, tipoVariId }) => {
  const nombreTipoVariRef = useRef(null);
  const [tiposVariedad, setTiposVariedad] = useState([]);

  useEffect(() => {
    const fetchTiposVariedad = async () => {
      try {
        const response = await axiosClient.get("/v1/tipo_vari");
        setTiposVariedad(response.data);
      } catch (error) {
        console.error("Error fetching tipos de variedad:", error);
        toast.error("Error al cargar la lista de tipos de variedad");
      }
    };

    fetchTiposVariedad();

    const fetchTipoVariData = async () => {
      if (mode === "update" && tipoVariId) {
        try {
          const response = await axiosClient.get(`/v1/tipo_vari/${tipoVariId}`);
          const tipoVariData = response.data;

          if (tipoVariData) {
            nombreTipoVariRef.current.value = tipoVariData.nombre_tipo_vari || "";
          }
        } catch (error) {
          console.error("Error fetching tipo de variedad data:", error);
          toast.error("Error al cargar datos del tipo de variedad");
        }
      }
    };

    fetchTipoVariData();
  }, [mode, tipoVariId]);

  const onSubmit = async (e) => {
    e.preventDefault();

    const data = {
      nombre_tipo_vari: nombreTipoVariRef.current.value,
    };

    try {
      let response;
      if (mode === "create") {
        response = await axiosClient.post("/v1/tipo_vari", data);
      } else if (mode === "update" && tipoVariId) {
        response = await axiosClient.put(`/v1/tipo_vari/${tipoVariId}`, data);
      }

      if (response && response.status === 200) {
        toast.success("Tipo de variedad registrado/actualizado con éxito", {
          duration: 2000,
        });
        onClose();
      } else {
        toast.error("Error al registrar/actualizar el tipo de variedad");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al registrar/actualizar el tipo de variedad");
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <TitleForModal>
        {mode === "update" ? "Actualizar Tipo de Variedad" : "Registrar Tipo de Variedad"}
      </TitleForModal>
      <div className="flex items-center">
        <InputWithIconAtom
          icon={icono.iconoBuscar} 
          placeholder="Nombre del Tipo de Variedad"
          required
          ref={nombreTipoVariRef}
        />
      </div>
      <center>
        <ButtonAtom type="submit">
          {mode === "update" ? "Actualizar" : "Registrar"}
        </ButtonAtom>
      </center>
    </form>
  );
};

export default RegisterTipoVariMolecule;
