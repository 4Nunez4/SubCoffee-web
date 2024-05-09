import React, { useState, useEffect } from "react";
import axiosClient from "../api/axios";
import toast from "react-hot-toast";
import TipoVariedadTable from "../components/Guard/TipoVariedadTable.jsx";
import FormTipovariedadOrganism from "../components/organisms/FormTipovariedadOrganism.jsx";
import ModalMessage from "../nextui/ModalMessage.jsx";

export function TipoVariedadT() {
  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState("create");
  const [initialData, setInitialData] = useState(null);
  const [results, setResults] = useState([]);
  const [modalMessage, setModalMessage] = useState(false);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    fetchVariedadList();
  }, []);

  const fetchVariedadList = async () => {
    try {
      const response = await axiosClient.get("/v1/tipo_vari");
      setResults(response.data.data);
    } catch (error) {
      console.error("Error fetching tipo de variedades list:", error);
    }
  };

  const desactivarTipoVariedad = (pk_id_tipo_vari) => {
    try {
      axiosClient.put(`/v1/tipo_varides/${pk_id_tipo_vari}`, null).then((response) => {
          console.log(response.data);
          if (response.status === 200) {
            setMensaje("¡Tipo de variedad desactivado con éxito! Ahora este no podrá ser utilizado por los usuarios.");
            setModalMessage(true);
            fetchVariedadList();
          }
        });
    } catch (error) {
      toast.error("Error en el sistema " + error);
    }
  };

  const activarTipoVariedad = async (pk_id_tipo_vari) => {
    try {
      const response = await axiosClient.put(`/v1/tipo_variac/${pk_id_tipo_vari}`);
      if (response.status === 200) {
        setMensaje("¡Tipo de variedad activado con éxito! Ahora está listo para ser utilizado por los usuarios.");
        setModalMessage(true);
        fetchVariedadList();
      }
    } catch (error) {
      toast.error("Error en el sistema " + error);
    }
  };

  const contenido = [
    { uid: "pk_id_tipo_vari", name: "Codigo Variedad", sortable: true },
    { uid: "nombre_tipo_vari", name: "Nombre Variedad", sortable: true },
    { uid: "estado_tipo_vari", name: "Estado variedad", sortable: true },
    { uid: "actions", name: "Acciones", sortable: false },
  ];

  const id = localStorage.getItem("id_tip_vari");

  const handleSubmit = async (data, e) => {
    e.preventDefault();
    try {
      const response = mode === "create"
          ? await axiosClient.post("/v1/tipo_vari", data)
          : await axiosClient.put( `/v1/tipo_vari/${id}`, data );
      const message = response.data.message;
      if (response.status === 200) {
        toast.success(message);
        setModalOpen(false);
        fetchVariedadList();
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
    <div className="w-full flex bg-gray-100 flex-col items-center px-10">
      <ModalMessage
        isOpen={modalMessage}
        onClose={() => setModalMessage(false)}
        label={mensaje}
      />
      <FormTipovariedadOrganism
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={mode === 'create' ? 'Registrar Tipo variedad' : 'Actualizar Tipo variedad'}
        actionLabel={mode === "create" ? "Registrar" : "Actualizar"}
        initialData={initialData}
        handleSubmit={handleSubmit}
        mode={mode}
      />
      <TipoVariedadTable
        actualizar={() => handleToggle("update", id)}
        registrar={() => handleToggle("create")}
        desactivar={desactivarTipoVariedad}
        activar={activarTipoVariedad}
        data={contenido}
        results={results}
      />
    </div>
  );
}
export default TipoVariedadT;
