import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

import ButtonAtom from "../atoms/ButtonAtom";
import InputWithIconAtom from "../atoms/InputWithIconAtom";
import TextTareaAtom from "../atoms/TextTareaAtom";
import { icono } from "../atoms/IconsAtom";

const ModalFincaMolecule = ({ onClose }) => {
  const nombreFincaRef = useRef(null);
  const direccionRef = useRef(null);
  const municipioRef = useRef(null);
  const departamentoRef = useRef(null);
  const imagenRef = useRef(null);
  const descripcionRef = useRef(null);
  const navigate = useNavigate();
  const URL = "http://localhost:9722/v1/finca";

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      nombre_fin: nombreFincaRef.current.value,
      ubicacion_fin: direccionRef.current.value,
      municipio_fin: municipioRef.current.value,
      departamento_fin: departamentoRef.current.value,
      imagen_fin: imagenRef.current.file,
      descripcion_fin: descripcionRef.current.value,
      fk_id_usuario: "1084251889",
      estado_fin: "activo",
    };

    if (
      !nombreFincaRef ||
      !direccionRef ||
      !municipioRef ||
      !departamentoRef ||
      !imagenRef ||
      !descripcionRef
    ) {
      toast.error("Por favor complete todos los campos del formulario");
      return;
    }

    axios
      .post(URL, data)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Finca creada con éxito!");
          navigate("/subcoffee");
          onClose();
        } else {
          toast.error("Error al crear la finca: " + error.message);
        }
      })
      .catch((error) => {
        toast.error("Error en el sistema " + error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <InputWithIconAtom
        icon={icono.iconoNamePropiedad}
        placeholder="Nombre de la Finca"
        required
        type="text"
        ref={nombreFincaRef}
      />
      <InputWithIconAtom
        icon={icono.iconoMundo}
        placeholder="Dirección"
        required
        type="text"
        ref={direccionRef}
      />
      <div className="grid grid-cols-2 gap-4">
        <InputWithIconAtom
          icon={icono.iconoMunicipio}
          placeholder="Municipio"
          required
          type="text"
          ref={municipioRef}
        />
        <InputWithIconAtom
          icon={icono.iconoDepartamento}
          placeholder="Departamento"
          required
          type="text"
          ref={departamentoRef}
        />
      </div>
      <InputWithIconAtom
        icon={icono.iconoPush}
        placeholder="Imagen"
        required
        type="file"
        ref={imagenRef}
      />
      <TextTareaAtom
        icon={icono.iconoDescript}
        ref={descripcionRef}
      ></TextTareaAtom>
      <center>
        <ButtonAtom type="submit">Crear Finca</ButtonAtom>
      </center>
    </form>
  );
};

export default ModalFincaMolecule;
