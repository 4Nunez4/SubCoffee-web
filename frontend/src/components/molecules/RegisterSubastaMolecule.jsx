import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { Button, Select, SelectItem } from "@nextui-org/react";

import InputWithIconAtom from "../atoms/InputWithIconAtom";
import TextTareaAtom from "../atoms/TextTareaAtom";
import TitleForModal from "../atoms/TitleForModal";
import axiosClient from "../../api/axios";
import { icono } from "../atoms/IconsAtom";

const RegisterSubastaMolecule = ({ mode, title, initialData, handleSubmit, actionLabel }) => {
  const fechaInicialRef = useRef(null);
  const fechaFinalRef = useRef(null);
  const imagenRef = useRef(null);
  const precioInicialRef = useRef(null);
  const [unidadPeso, setUnidadPeso] = useState([]);

  const [variedadesUser, setVariedadesUser] = useState([]);
  const [setVariedadUser, setSetVariedadUser] = useState("");

  const cantidadRef = useRef(null);
  const certificadoRef = useRef(null);
  const descripcionRef = useRef(null);

  const usuario = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fecthVariedadUser = async () => {
      try {
        const response = await axiosClient.get(
          `/v1/variedaduser/${usuario.pk_cedula_user}`
        );
        setVariedadesUser(response.data.data);
      } catch (error) {
        toast.error("Error fetching tipo variedades:", error);
      }
    };

    if (mode === "update" && initialData) {
      try {
        descripcionRef.current = initialData.descripcion_vari;
        setSetVariedadUser(initialData.fk_tipo_variedad);
      } catch (error) {
        toast.error("Error en el sistema:", error);
      }
    }

    fecthVariedadUser();
  }, [mode, initialData]);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("fecha_inicio_sub", fechaInicialRef.current.value);
      data.append("fecha_fin_sub", fechaFinalRef.current.value);
      data.append("precio_inicial_sub", precioInicialRef.current.value);
      data.append("unidad_peso_sub", unidadPeso);
      data.append("cantidad_sub", cantidadRef.current.value);
      data.append("imagen_sub", imagenRef.current?.files[0]);
      data.append("certificado_sub", certificadoRef.current?.files[0]);
      data.append("descripcion_sub", descripcionRef.current.value);
      data.append("fk_variedad", setVariedadUser);

      handleSubmit(data, e);
    } catch (error) {
      toast.error("Error en el sistema: " + error.message);
    }
  };

  const unidadesPeso = [
    { value: "Libra", label: "Libra" },
    { value: "Gramo", label: "Gramo" },
    { value: "Kilogramo", label: "Kilogramo" },
    { value: "Tonelada", label: "Tonelada" },
  ];

  return (
    <form onSubmit={onSubmit} className="space-y-4 p-4">
      <TitleForModal>
        {title}
      </TitleForModal>
      <div className="grid grid-cols-2">
        <InputWithIconAtom
          icon={icono.iconoFecha}
          placeholder="Fecha inicial"
          required
          type="datetime-local"
          ref={fechaInicialRef}
        />
        <InputWithIconAtom
          icon={icono.iconoDateDay}
          placeholder="Fecha final"
          required
          type="datetime-local"
          ref={fechaFinalRef}
        />
      </div>
      <div className="grid grid-cols-2 ">
        <InputWithIconAtom
          icon={icono.iconoPrice}
          placeholder="Precio Inicial"
          required
          type="number"
          ref={precioInicialRef}
        />
        <Select
          label="Seleccionar Variedad"
          value={setVariedadUser}
          variant="bordered"
          popoverProps={{
            classNames: {
              base: "before:bg-default-200",
              content: "p-0 border-small border-divider bg-background",
            },
          }}
          onChange={(e) => setSetVariedadUser(e.target.value)}
        >
          {variedadesUser
            .filter((variedad) => variedad.estado_vari === "activo")
            .map((variedad) => (
              <SelectItem
                key={variedad.pk_id_vari}
                value={variedad.pk_id_vari}
              >
                {variedad.nombre_tipo_vari}
              </SelectItem>
            ))}
        </Select>
      </div>
      <div className="grid grid-cols-2">
        <Select
          label="Unidad de peso"
          value={unidadPeso}
          variant="bordered"
          popoverProps={{
            classNames: {
              base: "before:bg-default-200",
              content: "p-0 border-small border-divider bg-background",
            },
          }}
          onChange={(value) => setUnidadPeso(value)}
        >
          {unidadesPeso.map((unidad) => (
            <SelectItem key={unidad.value} value={unidad.value}>
              {unidad.label}
            </SelectItem>
          ))}
        </Select>
        <InputWithIconAtom
          icon={icono.iconoQuantity}
          placeholder="Cantidad"
          required
          type="number"
          ref={cantidadRef}
        />
      </div>
      <div className="grid grid-cols-2">
        <InputWithIconAtom
          icon={icono.iconoPush}
          placeholder="Certificado"
          required
          type="file"
          ref={certificadoRef}
        />
        <InputWithIconAtom
          icon={icono.iconoPush}
          placeholder="Imagen del producto"
          required
          type="file"
          ref={imagenRef}
        />
      </div>
      <TextTareaAtom
        icon={icono.iconoDescript}
        placeholder="Descripción"
        ref={descripcionRef}
      />
      <center>
        <Button type="submit" className="bg-gray-600 text-white">
          {actionLabel}
        </Button>
      </center>
    </form>
  );
};

export default RegisterSubastaMolecule;
