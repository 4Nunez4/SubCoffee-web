import React, { useState, useEffect } from "react";
import axiosClient from "../api/axios";
import toast from "react-hot-toast";
import VeredaTable from "../components/Guard/VeredaTable.jsx";
import FormVeredaMolecule from "../components/organisms/FormVeredaMolecule.jsx";

export function VeredaT() {
  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState("create");
  const [initialData, setInitialData] = useState(null);
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchList(); //  Lista los datos al cargar la página
  }, []);

  const fetchList = async () => {
    try {
      const response = await axiosClient.get("/v1/veredas");
      setResults(response.data.data);
    } catch (error) {
      console.error("Error fetching dates list:", error);
    }
  };

  const peticionDesactivar = async (pk_id_vere) => {
    try {
      const response = await axiosClient.put(`/v1/veredasdes/${pk_id_vere}`);
      if (response.status === 200) {
        toast.success(response.data.message);
        fetchList(); // Actualizar la lista de datos después de desactivar
      }
    } catch (error) {
      toast.error("Error en el sistema " + error);
    }
  };
  
  const peticionActivar = async (pk_id_vere) => {
    try {
      const response = await axiosClient.put(`/v1/veredasac/${pk_id_vere}`);
      if (response.status === 200) {
        toast.success(response.data.message);
        fetchList(); // Actualizar la lista de datos después de activar
      }
    } catch (error) {
      toast.error("Error en el sistema " + error);
    }
  };

  const contenido = [
    { uid: "pk_id_vere", name: "Codigo Vereda", sortable: true },
    { uid: "nombre_vere", name: "Nombre Vereda", sortable: true },
    { uid: "estado_vere", name: "Estado Vereda", sortable: true },
    { uid: "nombre_muni", name: "Vereda", sortable: true },
    { uid: "actions", name: "Acciones", sortable: false },
  ];

const id =localStorage.getItem('id_vere')
  
  const handleSubmit = async (data, e) => {
    e.preventDefault();
    try {
      const response = mode === "create"
        ? await axiosClient.post("/v1/veredas", data)
        : await axiosClient.put(`/v1/veredas/${initialData.pk_id_vere}`, data);

      const message = response.data.message;
      if (response.status === 200) {
        toast.success(message);
        setModalOpen(false);
        fetchList(); // Actualizar la lista de datos después de crear o actualizar
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
      <FormVeredaMolecule
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        actionLabel={mode === "create" ? "Registrar" : "Actualizar"}
        initialData={initialData}
        handleSubmit={handleSubmit}
        mode={mode}
      />
      <VeredaTable
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

export default VeredaT;
