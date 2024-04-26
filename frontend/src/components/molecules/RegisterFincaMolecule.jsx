import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import InputWithIconAtom from "../atoms/InputWithIconAtom";
import TextTareaAtom from "../atoms/TextTareaAtom";
import { icono } from "../atoms/IconsAtom";
import { Button, Select, SelectItem } from "@nextui-org/react";
import TitleForModal from "../atoms/TitleForModal";
import axiosClient from "../../api/axios";

const RegisterFincaMolecule = ({ mode, initialData, handleSubmit, actionLabel }) => {
  const nombreFincaRef = useRef(null);
  const imagenRef = useRef(null);
  const descripcionRef = useRef(null);

  const [veredas, setVeredas] = useState([]);
  const [veredasRef, setVeredasRef] = useState("");

  const storedUser = localStorage.getItem("user");
  const users = storedUser ? JSON.parse(storedUser) : null;

  useEffect(() => {
    const fetchVeredas = async () => {
      try {
        const response = await axiosClient.get(`/v1/veredas`);
        setVeredas(response.data.data);
      } catch (error) {
        toast.error("Error fetching veredas:", error);
      }
    };

    fetchVeredas();

    if (mode === "update" && initialData) {
      try {
        descripcionRef.current = initialData.descripcion_fin;
        setVeredasRef(initialData.fk_finca);
      } catch (error) {
        toast.error("Error setting initial data:", error);
      }
    }
  }, [mode, initialData]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("nombre_fin", nombreFincaRef.current.value);
      formData.append("imagen_fin", imagenRef.current.files[0]);
      formData.append("descripcion_fin", descripcionRef.current.value);
      formData.append("fk_id_usuario", users.pk_cedula_user)
      formData.append("fk_vereda", veredasRef)

      handleSubmit(formData, e);
    } catch (error) {
      toast.error("Error del sistema:", error);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 p-4">
      <TitleForModal>
        {mode === "update"
          ? "Actualizar Finca"
          : "Registrar Finca"}
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
      <Select
        label="Vereda"
        value={veredasRef}
        onChange={(e) => setVeredasRef(e.target.value)}
      >
        {veredas.filter((vereda) => vereda.estado_vere === "activo").map((vereda) => (
          <SelectItem key={vereda.pk_id_vere} value={vereda.pk_id_vere}>
            {vereda.nombre_vere }
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
