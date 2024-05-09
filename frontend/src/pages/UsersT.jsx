import React, { useState, useEffect } from "react";
import axiosClient from "../api/axios";
import UsersTable from "../components/Guard/UsersTable.jsx";
import FormUserOrganism from "../components/organisms/FormUserOrganism.jsx";
import toast from "react-hot-toast";
import ModalMessage from "../nextui/ModalMessage.jsx";

export function UsersT() {
  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState("create");
  const [initialData, setInitialData] = useState(null);
  const [results, setResults] = useState([]);
  const [modalMessage, setModalMessage] = useState(false);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    fetchUserList(); //  Lista los usuarios al cargar la página
  }, []);

  const fetchUserList = async () => {
    try {
      const response = await axiosClient.get("/v1/users");
      setResults(response.data.data);
    } catch (error) {
      console.error("Error fetching user list:", error);
    }
  };

  const DesactivarUser = async (pk_cedula_user) => {
    try {
      const response = await axiosClient.put(`/v1/usersdes/${pk_cedula_user}`);
      if (response.status === 200) {
        setMensaje("¡Usuario desactivado con éxito! Ahora este no podrá iniciar sesión.");
        setModalMessage(true);
        fetchUserList(); // Actualizar la lista de usuarios después de desactivar
      }
    } catch (error) {
      toast.error("Error en el sistema " + error);
    }
  };

  const ActivarUser = async (pk_cedula_user) => {
    try {
      const response = await axiosClient.put(`/v1/usersac/${pk_cedula_user}`);
      if (response.status === 200) {
        setMensaje("¡Usuario activado con éxito! Ahora está listo para iniciar sesión.");
        setModalMessage(true);
        fetchUserList(); // Actualizar la lista de usuarios después de activar
      }
    } catch (error) {
      toast.error("Error en el sistema " + error);
    }
  };

  const contenido = [
    { uid: "nombre_user", name: "Usuario", sortable: true },
    { uid: "pk_cedula_user", name: "Cedula", sortable: true },
    { uid: "descripcion_user", name: "Descripción", sortable: true },
    { uid: "telefono_user", name: "Telefono", sortable: true },
    { uid: "fecha_nacimiento_user", name: "Fecha Nacimiento", sortable: true },
    { uid: "rol_user", name: "Rol", sortable: true },
    { uid: "estado_user", name: "Estado", sortable: true },
    { uid: "actions", name: "Acciones", sortable: false },
  ];

  const id = localStorage.getItem("idUser");

  const handleSubmit = async (data, e) => {
    e.preventDefault();
    try {
      const response = mode === "create"
          ? await axiosClient.post("/v1/users", data)
          : await axiosClient.put( `/v1/users/${initialData.pk_cedula_user}`, data );
      const message = response.data.message;
      if (response.status === 200) {
        toast.success(message);
        setModalOpen(false);
        fetchUserList(); // Actualizar la lista de usuarios después de crear o actualizar
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
    <div className="w-full h-auto bg-gray-100 flex flex-col items-center px-2">
      <ModalMessage
        isOpen={modalMessage}
        onClose={() => setModalMessage(false)}
        label={mensaje}
      />
      <FormUserOrganism
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={mode === 'create' ? 'Registrar Usuario' : 'Actualizar Usuario'}
        actionLabel={mode === "create" ? "Registrar" : "Actualizar"}
        initialData={initialData}
        handleSubmit={handleSubmit}
        mode={mode}
      />
      <UsersTable
        actualizarUser={() => handleToggle("update", id)}
        registrarUser={() => handleToggle("create")}
        desactivarUser={DesactivarUser}
        activarUser={ActivarUser}
        data={contenido}
        results={results}
      />
    </div>
  );
}

export default UsersT;
