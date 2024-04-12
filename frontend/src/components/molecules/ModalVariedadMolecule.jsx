import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

import ButtonAtom from "../atoms/ButtonAtom";
import InputWithIconAtom from "../atoms/InputWithIconAtom";
import { icono } from "../atoms/IconsAtom";

const ModalVariedadMolecule = ({ onClose }) => {
  const tipoVariRef = useRef(null);
  const descripcionVariRef = useRef(null);
  const imagenVariRef = useRef(null);
  const puntuacionVariRef = useRef(null);
  const navigate = useNavigate();
  const URL = "http://localhost:9722/v1/formvariedad";

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      tipo_vari: tipoVariRef.current.value,
      descripcion_vari: descripcionVariRef.current.value,
      imagen_vari: imagenVariRef.current.files[0],
      puntuacion_vari: puntuacionVariRef.current.value,
    };

    if (
      !tipoVariRef.current ||
      !descripcionVariRef.current ||
      !imagenVariRef.current ||
      !puntuacionVariRef.current 
    ) {
      toast.error("Por favor complete todos los campos del formulario");
      return;
    }

    axios
      .post(URL, data)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Variedad registrada con exito!");
          navigate("/subcoffee");
          onClose();
        } else {
          toast.error("Error al Crear la variedad: " + error.message);
        }
      })
      .catch((error) => {
        toast.error("Error en el sistema " + error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <InputWithIconAtom
        icon={icono.iconoType}
        placeholder="Tipo de Vari"
        required
        type="text"
        ref={tipoVariRef}
      />
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
        required
        type="file"
        ref={imagenVariRef}
      />
      <InputWithIconAtom
        icon={icono.iconoValor}
        placeholder="Puntuación"
        required
        type="number"
        ref={puntuacionVariRef}
      />
      <center>
        <ButtonAtom type="submit">Registrar Variedad</ButtonAtom>
      </center>
    </form>
  );
};

export default ModalVariedadMolecule;
