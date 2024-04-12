import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

import ButtonAtom from "../atoms/ButtonAtom";
import InputWithIconAtom from "../atoms/InputWithIconAtom";
import { icono } from "../atoms/IconsAtom";
import TextTareaAtom from "../atoms/TextTareaAtom";

const SubastaFormMolecule = () => {
  const nombreSubastaRef = useRef(null);
  const fechaInicialRef = useRef(null);
  const fechaFinalRef = useRef(null);
  const cantidadRef = useRef(null);
  const precioInicialRef = useRef(null);
  const imagenRef = useRef(null);
  const tipoVariedadRef = useRef(null);
  const puntuacionCafeRef = useRef(null);
  const descripcionRef = useRef(null);

  const navigate = useNavigate();
  const URL = "http://localhost:9722/v1/formsub";

  const onSubmit = async (e) => {
    e.preventDefault();

    const data = {
      nombreSubasta: nombreSubastaRef.current.value,
      fechaInicial: fechaInicialRef.current.value,
      fechaFinal: fechaFinalRef.current.value,
      cantidad: cantidadRef.current.value,
      precioInicial: precioInicialRef.current.value,
      imagen: imagenRef.current.files[0],
      tipoVariedad: tipoVariedadRef.current.value,
      puntuacionCafe: puntuacionCafeRef.current.value,
      descripcion: descripcionRef.current.value,
    };

    axios
      .post(URL, data)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Subasta creada con éxito");
          navigate("/subcoffee"); 
        } else {
          toast.error("Error al crear la subasta");
        }
      })
      .catch((error) => {
        toast.error("Error en el sistema: " + error.message);
      });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <InputWithIconAtom
        icon={icono.iconoNamePropiedad}
        placeholder="Nombre de la Subasta"
        required
        type="text"
        ref={nombreSubastaRef}
      />
      <div className="grid grid-cols-2">
        <InputWithIconAtom
          icon={icono.iconoFecha}
          placeholder="Fecha inicial"
          required
          type="date"
          ref={fechaInicialRef}
        />
        <InputWithIconAtom
          icon={icono.iconoDateDay}
          placeholder="Fecha final"
          required
          type="date"
          ref={fechaFinalRef}
        />
      </div>
      <div className="grid grid-cols-2 gap-x-2">
        <InputWithIconAtom
          icon={icono.iconoQuantity}
          placeholder="Cantidad"
          required
          type="number"
          ref={cantidadRef}
        />
        <InputWithIconAtom
          icon={icono.iconoPrice}
          placeholder="Precio Inicial"
          required
          type="number"
          ref={precioInicialRef}
        />
      </div>
      <InputWithIconAtom
        icon={icono.iconoPush}
        placeholder="Imagen del producto"
        required
        type="file"
        ref={imagenRef}
      />
      <div className="grid grid-cols-2">
        <InputWithIconAtom
          icon={icono.iconoType}
          placeholder="Tipo de variedad"
          required
          type="text"
          ref={tipoVariedadRef}
        />
        <InputWithIconAtom
          icon={icono.iconoValor}
          placeholder="Puntuación café"
          required
          type="number"
          step="any"
          ref={puntuacionCafeRef}
        />
      </div>
      <TextTareaAtom
        icon={icono.iconoDescript}
        placeholder="Descripción"
        ref={descripcionRef}
      />
      <center>
        <ButtonAtom type="submit">Crear subasta</ButtonAtom>
      </center>
    </form>
  );
}

export default SubastaFormMolecule;
