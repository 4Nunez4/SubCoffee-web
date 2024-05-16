import React, { createContext, useEffect, useState } from "react";

import ModalMessage from "../nextui/ModalMessage";
import {
  createSubasta,
  getSubastaForUser,
  getSubastas,
  updateSubasta,
  updateSubastaActivar,
  updateSubastaDesact,
} from "../api/api.subasta";

const SubastaContext = createContext();

export const SubastaProvider = ({ children }) => {
  const [modalMessage, setModalMessage] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [errors, setErrors] = useState([]);
  const [idSubasta, setIdSubasta] = useState(0);
  const [subastaForuser, setSubastaForUser] = useState([]);
  const [subastas, setSubastas] = useState([])

  const getSubs = async () => {
    try {
      const response = await getSubastas()
      setSubastas(response.data)
    } catch (error) {
      console.error(error);
    }
  }

  const getSubForUser = async (user) => {
    try {
      const response = await getSubastaForUser(user);
      setSubastaForUser(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createSubs = async (data, user) => {
    try {
      const response = await createSubasta(data);
      getSubForUser(user);
      setMensaje(response.data.message);
      setModalMessage(true);
    } catch (error) {
      setErrors([error.response.data.message]);
    }
  };

  const updateSubs = async (id, data, user) => {
    try {
      const response = await updateSubasta(id, data);
      getSubForUser(user);
      setMensaje(response.data.message);
      setModalMessage(true);
    } catch (error) {
      setErrors([error.response.data.message]);
    }
  };

  const desactivarSubs = async (id, user) => {
    try {
      const response = await updateSubastaDesact(id);
      getSubForUser(user);
      setMensaje(response.data.message);
      setModalMessage(true);
    } catch (error) {
      setErrors([error.response.data.message]);
    }
  };

  const activarSubs = async (id, user) => {
    try {
      const response = await updateSubastaActivar(id);
      getSubForUser(user);
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
    <SubastaContext.Provider
      value={{
        errors,
        subastas,
        idSubasta,
        subastaForuser,
        setSubastaForUser,
        setIdSubasta,
        getSubForUser,
        getSubs,
        createSubs,
        updateSubs,
        desactivarSubs,
        activarSubs,
      }}
    >
      <ModalMessage
        isOpen={modalMessage}
        onClose={() => setModalMessage(false)}
        label={mensaje}
      />
      {children}
    </SubastaContext.Provider>
  );
};

export default SubastaContext;
