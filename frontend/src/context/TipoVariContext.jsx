import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getTipoVaris,
  createTipoVaris,
  updateTipoVaris,
  UpdateTipoVarisActivar,
  UpdateTipoVarisDesact,
  getTipoVarisActivas,
} from "../api/api.tipoVari";
import ModalMessage from "../nextui/ModalMessage";

const TipoVariContext = createContext();

export const useTipoVariContext = () => {
  const context = useContext(TipoVariContext)
  if (!context) {
    throw new Error('Debes usar MunicipioProvider en el App')
  }
  return context;
}

export const TipoVariProvider = ({ children }) => {
  const [modalMessage, setModalMessage] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [errors, setErrors] = useState([]);
  const [tipoVariedades, setTipoVariedades] = useState([]);
  const [idTipoVariedad, setIdTipoVariedad] = useState(0)

  const [tipoVariedadsActivos, setTipoVariedadsActivos] = useState([]);
  const [cerrarModal, setCerrarModal] = useState(false)

  const getTipoVariedades = async () => {
    try {
      const res = await getTipoVaris();
      setTipoVariedades(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getTipoVariedadesActivas = async () => {
    try {
      const res = await getTipoVarisActivas();
      setTipoVariedadsActivos(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createTipoVariedades = async (data) => {
    try {
      const response = await createTipoVaris(data);
      if(response.status === 200){
        getTipoVariedades();
        setMensaje(response.data.message);
        setModalMessage(true);
        setCerrarModal(true)
      }
    } catch (error) {
      setErrors([error.response.data.message]);
    }
  };

  const updateTipoVariedades = async (id, data) => {
    try {
      const response = await updateTipoVaris(id, data);
      if(response.status === 200){
        getTipoVariedades();
        setMensaje(response.data.message);
        setModalMessage(true);
        setCerrarModal(true)
      }
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
      console.error(error);
    }
  };

  const activarTipoVariedades = async (id) => {
    try {
      const response = await UpdateTipoVarisActivar(id);
      getTipoVariedades();
      setMensaje(response.data.message);
      setModalMessage(true);
    } catch (error) {
      console.error(error);
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

        cerrarModal, 
        setCerrarModal,
        getTipoVariedadesActivas,
        tipoVariedadsActivos
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