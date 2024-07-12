import React, { createContext, useEffect, useState } from "react";

import ModalMessage from "../nextui/ModalMessage";
import {
    getNotificaciones ,
    getNotificacionesForUser,
    createNotificaciones ,
    updateNotificaciones ,
} from "../api/api.notificaciones";

const NotificacionContext = createContext();

export const NotificacionesProvider = ({ children }) => {
  const [modalMessage, setModalMessage] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [errors, setErrors] = useState([]);
  const [idNotificaciones, setIdNotificaciones] = useState(0);
  const [NotificacionesForuser, setNotificacionesForUser] = useState([]);
  const [Notificaciones, setNotificaciones] = useState([])

  const getNots = async () => {
    try {
      const response = await getNotificaciones();
      setNotificaciones(response.data.data); // Actualizar el estado Notificaciones
      return response.data.data; // Devolver los datos directamente
    } catch (error) {
      console.error(error);
      setNotificaciones([]); // Establecer un arreglo vacío en caso de error
      return []; // Devolver un arreglo vacío en caso de error
    }
  };
  const getNotForUser = async (user) => {
    try {
      const response = await getNotificacionesForUser(user);
      setNotificacionesForUser(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createNots = async (data, user) => {
    try {
      const response = await createNotificaciones(data);
      getNotForUser(user);
      setMensaje(response.data.message);
      setModalMessage(true);
    } catch (error) {
      setErrors([error.response.data.message]);
    }
  };

  const updateNots = async (id, data, user) => {
    try {
      const response = await updateNotificaciones(id, data);
      getNotForUser(user);
      setMensaje(response.data.message);
      setModalMessage(true);
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
  }, [errors, getNots]);
  
  return (
    <NotificacionContext.Provider
      value={{
        errors,
        Notificaciones,
        idNotificaciones,
        NotificacionesForuser,
        setNotificacionesForUser,
        setIdNotificaciones,
        getNotForUser,
        getNots,
        createNots,
        updateNots,
 
      }}
    >
      <ModalMessage
        isOpen={modalMessage}
        onClose={() => setModalMessage(false)}
        label={mensaje}
      />
      {children}
    </NotificacionContext.Provider>
  );
};

export default NotificacionContext;
