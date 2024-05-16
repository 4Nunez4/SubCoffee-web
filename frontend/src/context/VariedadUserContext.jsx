import React, { createContext, useEffect, useState } from "react";

import ModalMessage from "../nextui/ModalMessage";
import { createVariedad, getVariedad, updateVariedadActivar, updateVariedadDesact, updatevariedad } from "../api/api.variedad.user";

const VariedadUserContext = createContext();

export const VariedadUserProvider = ({ children }) => {
  const [modalMessage, setModalMessage] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [errors, setErrors] = useState([]);
  const [variedades, setVariedades] = useState([]);
  const [idVariedad, setIdVariedad] = useState(0);
  const [variedadForuser, setVariedadForUser] = useState([])

  const getVariForUser = async (user) => {
    try {
      const response = await getVariedad(user)
      setVariedadForUser(response.data.data)
    } catch (error) {
      console.error(error);
    }
  }

  const createVaris = async (data, user) => {
    try {
      const response = await createVariedad(data);
      getVariForUser(user);
      setMensaje(response.data.message);
      setModalMessage(true);
    } catch (error) {
      setErrors([error.response.data.message]);
    }
  };

  const updateVaris = async (id, data, user) => {
    try {
      const response = await updatevariedad(id, data);
      getVariForUser(user);
      setMensaje(response.data.message);
      setModalMessage(true);
    } catch (error) {
      setErrors([error.response.data.message]);
    }
  };

  const desactivarVaris = async (id, user) => {
    try {
      const response = await updateVariedadDesact(id);
      getVariForUser(user);
      setMensaje(response.data.message);
      setModalMessage(true);
    } catch (error) {
      setErrors([error.response.data.message]);
    }
  };

  const activarVaris = async (id, user) => {
    try {
      const response = await updateVariedadActivar(id);
      getVariForUser(user);
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
  }, [errors]);

  return (
    <VariedadUserContext.Provider
      value={{
        errors,
        variedades,
        idVariedad,
        variedadForuser,
        setVariedadForUser,
        setIdVariedad,
        setVariedades,
        getVariForUser,
        createVaris,
        updateVaris,
        desactivarVaris,
        activarVaris,
      }}
    >
      <ModalMessage
        isOpen={modalMessage}
        onClose={() => setModalMessage(false)}
        label={mensaje}
      />
      {children}
    </VariedadUserContext.Provider>
  );
};

export default VariedadUserContext;
