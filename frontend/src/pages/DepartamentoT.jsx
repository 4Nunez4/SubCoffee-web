import React, { useState, useEffect } from "react";
import axiosClient from "../api/axios";
import toast from "react-hot-toast";
import DepartamentoTable from "../components/Guard/DepartamentoTable.jsx";
import FormDepartamentoOrganism from "../components/organisms/FormDepartamentoOrganism.jsx";

export function DepartamentoT() {
  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState("create");
  const [initialData, setInitialData] = useState(null);
  const [results, setResults] = useState([]);

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

  const peticionDesactivar = async (pk_codigo_depar) => {
    try {
      const response = await axiosClient.put(`/v1/departamentosdes/${pk_codigo_depar}`);
      if (response.status === 200) {
        toast.success(response.data.message);
        fetchDepartamentoList(); // Actualizar la lista de departamentos después de desactivar
      }
    } catch (error) {
      toast.error("Error en el sistema " + error);
    }
  };
  
  const peticionActivar = async (pk_codigo_depar) => {
    try {
      const response = await axiosClient.put(`/v1/departamentosac/${pk_codigo_depar}`);
      if (response.status === 200) {
        toast.success(response.data.message);
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

const id =localStorage.getItem('idUser')
  
  const handleSubmit = async (data, e) => {
    e.preventDefault();
    try {
      const response = mode === "create"
        ? await axiosClient.post("/v1/departamentos", data)
        : await axiosClient.put(`/v1/departamentos/${initialData.pk_codigo_depar}`, data);

      const message = response.data.message;
      if (response.status === 200) {
        toast.success(message);
        setModalOpen(false);
        fetchDepartamentoList(); // Actualizar la lista de departamentos después de crear o actualizar
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error("Error en el servidor:", error);
      toast.error("Error en el servidor");
    }
  };

  const handleToggle = (mode, initialData) => {
    setInitialData(initialData);
    setModalOpen(true);
    setMode(mode);
  };

  return (
    <div className="w-full flex flex-col items-center px-10">
      <FormDepartamentoOrganism
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={mode === "create" ? "Registrar Departamento" : "Actualizar Departamento"}
        actionLabel={mode === "create" ? "Registrar" : "Actualizar"}
        initialData={initialData}
        handleSubmit={handleSubmit}
        mode={mode}
      />
      <DepartamentoTable
        actualizar={() => handleToggle("update", id)}
        registrar={() => handleToggle("create")}
        desactivar={peticionDesactivar}
        activar={peticionActivar}
        data={contenido}
        results={results}
      />
    </div>
  );
}

export default DepartamentoT;
