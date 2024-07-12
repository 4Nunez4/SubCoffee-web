import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getVeredas,
  getVeredasForMunis,
  createVeredas,
  updateVeredas,
  updateVeredaActivar,
  updateVeredaDesact,
  getVeredasActivas
} from "../api/api.veredas";
import ModalMessage from "../nextui/ModalMessage";

const VeredaContext = createContext();

export const useVeredaContext = () => {
  const context = useContext(VeredaContext)
  if (!context) {
    throw new Error('Debes usar MunicipioProvider en el App')
  }
  return context;
}

export const VeredaProvider = ({ children }) => {
  const [modalMessage, setModalMessage] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [errors, setErrors] = useState([]);
  const [veredas, setVeredas] = useState([]);
  const [idVereda, setIdVereda] = useState(0)
  const [veredasForMuni, setVeredasForMuni] = useState([])

  const [municipiosActivos, setMunicipiosActivos] = useState([]);
  const [cerrarModal, setCerrarModal] = useState(false)

  const getVeres = async () => {
    try {
      const res = await getVeredas();
      setVeredas(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getVeresForMuniActivas = async (municipio) => {
    try {
      const res = await getVeredasActivas(municipio);
      setMunicipiosActivos(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getVeresForMuni = async (municipio) => {
    try {
      const response = await getVeredasForMunis(municipio)
      setVeredasForMuni(response.data)
    } catch (error) {
      console.error(error);
    }
  }

  const createVeres = async (data) => {
    try {
      const response = await createVeredas(data);
      if(response.status === 200){
        getVeres();
        setMensaje(response.data.message);
        setModalMessage(true);
        setCerrarModal(true)
      }
    } catch (error) {
      setErrors([error.response.data.message]);
    }
  };

  const updateVeres = async (id, data) => {
    try {
      const response = await updateVeredas(id, data);
      if(response.status === 200) {
        getVeres();
        setMensaje(response.data.message);
        setModalMessage(true);
        setCerrarModal(true)
      }
    } catch (error) {
      setErrors([error.response.data.message]);
    }
  };

  const desactivarVeres = async (id) => {
    try {
      const response = await updateVeredaDesact(id);
      getVeres();
      setMensaje(response.data.message);
      setModalMessage(true);
    } catch (error) {
      console.error(error);
    }
  };

  const activarVeres = async (id) => {
    try {
      const response = await updateVeredaActivar(id);
      getVeres();
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
    <VeredaContext.Provider
      value={{
        errors,
        veredas,
        idVereda,
        veredasForMuni, 
        setIdVereda,
        setVeredas,
        setVeredasForMuni,
        getVeres,
        getVeresForMuni,
        createVeres,
        updateVeres,
        desactivarVeres,
        activarVeres,

        getVeresForMuniActivas,
        cerrarModal, 
        setCerrarModal,
        municipiosActivos,
      }}
    >
      <ModalMessage
        isOpen={modalMessage}
        onClose={() => setModalMessage(false)}
        label={mensaje}
      />
      {children}
    </VeredaContext.Provider>
  );
};

export default VeredaContext;