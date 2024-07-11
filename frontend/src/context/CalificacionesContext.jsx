import React, { createContext, useContext, useEffect, useState } from "react";
import ModalMessage from "../nextui/ModalMessage";
import {
  createCalificaciones,
  updateCalificaciones,
  getCalificaciones,
  getCalificacioUser,
} from "../api/api.calificaciones";

const CalificacionesContext = createContext();

export const useCalificacionesContext = () => {
  const context = useContext(CalificacionesContext);
  if (!context) {
    throw new Error("Debes usar CalifiProvider en el App");
  }
  return context;
};

export const CalifiProvider = ({ children }) => {
  const [modalMessage, setModalMessage] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [errors, setErrors] = useState([]);
  const [idCalificacion, setIdCalificacion] = useState(0);

  const [calificaciones, setCalificaciones] = useState([]);
  const [stats, setStats] = useState({});
  const [cerrarModal, setCerrarModal] = useState(false);
  const [calificacion, setCalificacion] = useState([]);

  const getCalificacionesUser = async (id) => {
    try {
      const response = await getCalificaciones(id);
      setCalificaciones(response.data.calificaciones);
      setStats(response.data.stats);
    } catch (error) {
      console.log(error);
    }
  };

  const getCalificacion = async (id) => {
    try {
      await getCalificacioUser(id).then((response) => {
        setCalificacion(response.data.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const createCalificacion = async (data) => {
    try {
      const response = await createCalificaciones(data);
      if (response.status === 200) {
        setMensaje(response.data.message);
        setModalMessage(true);
        setCerrarModal(true);
      }
    } catch (error) {
      setErrors([error.response.data.message]);
    }
  };

  const updateCalificacion = async (id, data) => {
    try {
      const response = await updateCalificaciones(id, data);
      if (response.status === 200) {
        setMensaje(response.data.message);
        setModalMessage(true);
        setCerrarModal(true);
      }
    } catch (error) {
      setErrors([error.response.data.message]);
    }
  };

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  return (
    <CalificacionesContext.Provider
      value={{
        getCalificacionesUser,
        createCalificacion,
        updateCalificacion,
        calificaciones,
        stats,
        idCalificacion,
        setIdCalificacion,
        cerrarModal,
        setCerrarModal,
        getCalificacion,
        calificacion,
      }}
    >
      <ModalMessage
        isOpen={modalMessage}
        onClose={() => setModalMessage(false)}
        label={mensaje}
      />
      {children}
    </CalificacionesContext.Provider>
  );
};

export default CalificacionesContext;
