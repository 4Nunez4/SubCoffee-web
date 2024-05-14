import React, { createContext, useState } from "react";
import {
  getTipoVaris,
  createTipoVaris,
  updateTipoVaris,
  UpdateTipoVarisActivar,
  UpdateTipoVarisDesact,
} from "../api/api.tipoVari";
import ModalMessage from "../nextui/ModalMessage";

const TipoVariContext = createContext();

export const TipoVariProvider = ({ children }) => {
  const [modalMessage, setModalMessage] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [errors, setErrors] = useState([]);
  const [tipoVariedades, setTipoVariedades] = useState([]);
  const [idTipoVariedad, setIdTipoVariedad] = useState(0)

  const getTipoVariedades = async () => {
    try {
      const res = await getTipoVaris();
      setTipoVariedades(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createTipoVariedades = async (data) => {
    try {
      const response = await createTipoVaris(data);
      getTipoVariedades();
      setMensaje(response.data.message);
      setModalMessage(true);
    } catch (error) {
      setErrors([error.response.data.message]);
    }
  };

  const updateTipoVariedades = async (id, data) => {
    try {
      const response = await updateTipoVaris(id, data);
      getTipoVariedades();
      setMensaje(response.data.message);
      setModalMessage(true);
    } catch (error) {
      setErrors([error.response.data.message]);
    }
  };

  const desactivarTipoVariedades = async (id) => {
    try {
      const response = await UpdateTipoVarisDesact(id);
      getTipoVariedades();
      setMensaje(response.data.message);
      setModalMessage(true);
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  const activarTipoVariedades = async (id) => {
    try {
      const response = await UpdateTipoVarisActivar(id);
      getTipoVariedades();
      setMensaje(response.data.message);
      setModalMessage(true);
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  return (
    <TipoVariContext.Provider
      value={{
        errors,
        tipoVariedades,
        idTipoVariedad, 
        setIdTipoVariedad,
        setTipoVariedades,
        getTipoVariedades,
        createTipoVariedades,
        updateTipoVariedades,
        desactivarTipoVariedades,
        activarTipoVariedades,
      }}
    >
      <ModalMessage
        isOpen={modalMessage}
        onClose={() => setModalMessage(false)}
        label={mensaje}
      />
      {children}
    </TipoVariContext.Provider>
  );
};

export default TipoVariContext;