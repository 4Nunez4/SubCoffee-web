import React, { useState, useEffect } from "react";
import axiosClient from "../api/axios";
import toast from "react-hot-toast";
import DepartamentoTable from "../components/Guard/DepartamentoTable.jsx";
import FormDepartamentoOrganism from "../components/organisms/FormDepartamentoOrganism.jsx";
import ModalMessage from "../nextui/ModalMessage.jsx";

export function DepartamentoT() {
  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState("create");
  const [initialData, setInitialData] = useState(null);
  const [results, setResults] = useState([]);
  const [modalMessage, setModalMessage] = useState(false);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    fetchDepartamentoList(); //  Lista los departamentos al cargar la página
  }, []);

  const fetchDepartamentoList = async () => {
    try {
      const response = await axiosClient.get("/v1/departamentos");
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching departamentos list:", error);
    }
  };

  const desactivarDepartamento = async (pk_codigo_depar) => {
    try {
      const response = await axiosClient.put(
        `/v1/departamentosdes/${pk_codigo_depar}`
      );
      if (response.status === 200) {
        setMensaje("¡Departamento desactivado con éxito! Ahora este no podrá ser utilizado por los usuarios.");
        setModalMessage(true);
        fetchDepartamentoList(); // Actualizar la lista de departamentos después de desactivar
      }
    } catch (error) {
      toast.error("Error en el sistema " + error);
    }
  };

  const activarDepartamento = async (pk_codigo_depar) => {
    try {
      const response = await axiosClient.put(
        `/v1/departamentosac/${pk_codigo_depar}`
      );
      if (response.status === 200) {
        setMensaje("¡Departamento activado con éxito! Ahora este listo para ser utilizado por los usuarios.");
        setModalMessage(true);
        fetchDepartamentoList(); // Actualizar la lista de departamentos después de activar
      }
    } catch (error) {
      toast.error("Error en el sistema " + error);
    }
  };

  const contenido = [
    { uid: "pk_codigo_depar", name: "Codigo Departamento", sortable: true },
    { uid: "nombre_depar", name: "Nombre Departamento", sortable: true },
    { uid: "estado_depar", name: "Estado Departamento", sortable: true },
    { uid: "actions", name: "Acciones", sortable: false },
  ];

  const id = localStorage.getItem("id_depar");

  const handleToggle = (mode, initialData) => {
    setInitialData(initialData);
    setModalOpen(true);
    setMode(mode);
  };

  const handleSubmit = async (data, e) => {
    e.preventDefault();
    try {
      if (mode === "create") {
        await axiosClient.post("/v1/departamentos", data).then((response) => {
          if (response.status === 200) {
            toast.success(response.data.message);
            setModalOpen(false);
            fetchDepartamentoList();
          } else {
            toast.error("Error al registrar el departamento");
          }
        });
      } else if (mode === "update") {
        await axiosClient.put(`/v1/departamentos/${id}`, data).then((response) => {
          if (response.status == 200) {
            toast.success(response.data.message);
            setModalOpen(false);
            fetchDepartamentoList();
          } else {
            toast.error("Error al actualizar");
          }
        });
      }
    } catch (error) {
      console.error("Error en el servidor:", error);
    }
  };

  return (
    <div className="w-full flex flex-col items-center px-10">
      <ModalMessage
        isOpen={modalMessage}
        onClose={() => setModalMessage(false)}
        label={mensaje}
      />
      <FormDepartamentoOrganism
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={mode === "create"? "Registrar Departamento": "Actualizar Departamento"}
        actionLabel={mode === "create" ? "Registrar" : "Actualizar"}
        initialData={initialData}
        handleSubmit={handleSubmit}
        mode={mode}
      />
      <DepartamentoTable
        actualizar={() => handleToggle("update", id)}
        registrar={() => handleToggle("create")}
        desactivar={desactivarDepartamento}
        activar={activarDepartamento}
        data={contenido}
        results={results}
      />
    </div>
  );
}

export default DepartamentoT;
