import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

import ButtonAtom from "../atoms/ButtonAtom";
import InputWithIconAtom from "../atoms/InputWithIconAtom";
import { icono } from "../atoms/IconsAtom";
import TextTareaAtom from "../atoms/TextTareaAtom";

const SubastaFormMolecule = () => {

  const navigate = useNavigate();
  const URL = "http://localhost:9722/v1/formsub";

  const pk_id_sub = useRef(null);
  const fecha_inicio_sub = useRef(null);
  const fecha_fin_sub = useRef(null);
  const precio_inicial_sub = useRef(null);
  const precio_final_sub = useRef(null);
  const unidad_peso_sub = useRef(null);
  const cantidad_sub = useRef(null);
  const estado_sub = useRef(null);
  const fk_variedad = useRef(null);
  const certificado_sub = useRef(null);
  const imagen_sub = useRef(null);
  const descripcion_sub = useRef(null)

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {

      pk_id_sub: pk_id_sub.current.value,
      fecha_inicio_sub: fecha_inicio_sub.current.value,
      fecha_fin_sub: fecha_fin_sub.current.value,
      precio_inicial_sub: precio_inicial_sub.current.value,
      precio_final_sub: precio_final_sub.current.value,
      unidad_peso_sub: unidad_peso_sub.current.value,
      cantidad_sub: cantidad_sub.current.value,
      estado_sub: estado_sub.current.value,
      fk_variedad: fk_variedad.current.value,
      certificado_sub: certificado_sub.current.value,
      imagen_sub: imagen_sub.current.value,
      descripcion_sub: descripcion_sub.current.value
    };

    axios.post(URL, data, {
      headers:{
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3dzIjpbeyJwa19jZWR1bGFfdXNlciI6MTA3OTM3MzgsIm5vbWJyZV91c2VyIjoiVmFsZW50aW5hIERpYXogTGVybWEgIiwiZW1haWxfdXNlciI6InZhbGVudGluYUBnbWFpbC5jb20iLCJwYXNzd29yZF91c2VyIjoiMTIzIiwiZGVzY3JpcGNpb25fdXNlciI6IkNhZmV0ZXJvcyIsImltYWdlbl91c2VyIjpudWxsLCJ0ZWxlZm9ub191c2VyIjoiMzIwNDYyMjY4MCIsImZlY2hhX25hY2ltaWVudG9fdXNlciI6IjE4OTktMTEtMzBUMDQ6NTY6MTYuMDAwWiIsInJvbF91c2VyIjoiYWRtaW4iLCJlc3RhZG9fdXNlciI6bnVsbH1dLCJpYXQiOjE3MTI5NDI0OTksImV4cCI6MTcxMzAyODg5OX0.5xEJNlEhGBPY0_fqmz5_rpTKoHbPfaTZmT9LbE9nSs8"
      }
    }).then((response) => {
        if (response.status === 200) {
          toast.success("Subasta creada con éxito");
          navigate("/subcoffee"); 
        } else {
          toast.error("Error al crear la subasta");
        }
      })
    }
    catch(error){
      toast.error("Error en el sistema: " + error.message)
    }

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
