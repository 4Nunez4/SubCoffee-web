import React, { useRef, useEffect } from "react";
import axiosClient from "../../api/axios";
import ButtonAtom from "../atoms/ButtonAtom";
import InputWithIconAtom from "../atoms/InputWithIconAtom";
import TitleForModal from "../atoms/TitleForModal";
import toast from "react-hot-toast";
import { icono } from "../atoms/IconsAtom";

const RegisterDepartMolecule = ({ onClose, mode, departmentId }) => {
  const codigoDepartamento = useRef(null);
  const nombreDepartamento = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      if (mode === "update" && departmentId) {
        try {
          const response = await axiosClient.get(
            `/v1/departamentos/${departmentId}`
          );
          const departmentData = response.data;

          if (departmentData) {
            codigoDepartamento.current.value =
              departmentData.pk_codigo_depar || "";
            nombreDepartamento.current.value =
              departmentData.nombre_depart || "";
          }
        } catch (error) {
          console.error("Error fetching department data:", error);
          toast.error("Error al cargar datos del departamento");
        }
      }
    };

    fetchData();
  }, [mode, departmentId]);

  const onSubmit = async (e) => {
    e.preventDefault();

    const data = {
      pk_codigo_depar: codigoDepartamento.current.value,
      nombre_depart: nombreDepartamento.current.value,
    };

    try {
      let response;
      if (mode === "create") {
        response = await axiosClient.post("/v1/departamentos", data);
      } else if (mode === "update" && departmentId) {
        response = await axiosClient.put(
          `/v1/departamentos/${departmentId}`,
          data
        );
      }

      if (response && response.status === 200) {
        toast.success("Departamento registrado/actualizado con éxito", {
          duration: 2000,
        });
        onClose();
      } else {
        toast.error("Error al registrar/actualizar el departamento");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al registrar/actualizar el departamento");
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <TitleForModal>
        {mode === "update"
          ? "Actualizar Departamento"
          : "Registrar Departamento"}
      </TitleForModal>
      <InputWithIconAtom
        icon={icono.iconoCampana}
        placeholder="Código del Departamento"
        required
        type="text"
        ref={codigoDepartamento}
      />
      <InputWithIconAtom
        icon={icono.iconoUser}
        placeholder="Nombre del Departamento"
        required
        type="text"
        ref={nombreDepartamento}
      />
      <center>
        <ButtonAtom type="submit">
          {mode === "update" ? "Actualizar" : "Registrar"}
        </ButtonAtom>
      </center>
    </form>
  );
};

export default RegisterDepartMolecule;
