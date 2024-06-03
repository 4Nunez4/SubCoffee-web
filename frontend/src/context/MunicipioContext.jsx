import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getMunicipios,
  createMunicipios,
  updateMunicipios,
  UpdateMunicipioActivar,
  UpdateMunicipioDesact,
  getMuniForDepartamento,
  getMunicipiosActivos,
} from "../api/api.municipios";
import ModalMessage from "../nextui/ModalMessage";

const MunicipioContext = createContext();

export const useMunicipioContext = () => {
  const context = useContext(MunicipioContext)
  if (!context) {
    throw new Error('Debes usar MunicipioProvider en el App')
  }
  return context;
}

export const MunicipioProvider = ({ children }) => {
  const [modalMessage, setModalMessage] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [errors, setErrors] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [idMunicipio, setIdMunicipio] = useState(0);
  const [municipiosForDepar, setMunicipiosForDepar] = useState([])

  const [municipiosActivos, setMunicipiosActivos] = useState([]);
  const [cerrarModal, setCerrarModal] = useState(false)

  const getMunis = async () => {
    try {
      const res = await getMunicipios();
      setMunicipios(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getMunisForDeparActivos = async (departamento) => {
    try {
      const res = await getMunicipiosActivos(departamento);
      setMunicipiosActivos(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getMunisForDepar = async (departamento) => {
    try {
      const response = await getMuniForDepartamento(departamento)
      setMunicipiosForDepar(response.data)
    } catch (error) {
      console.error(error);
    }
  }

  const createMunis = async (data) => {
    try {
      const response = await createMunicipios(data);
      if(response.status === 200){
        getMunis();
        setMensaje(response.data.message);
        setModalMessage(true);
        setCerrarModal(true)
      }
    } catch (error) {
      setErrors([error.response.data.message]);
    }
  };

  const updateMunis = async (id, data) => {
    try {
      const response = await updateMunicipios(id, data);
      if(response.status === 200) {
        getMunis();
        setMensaje(response.data.message);
        setModalMessage(true);
        setCerrarModal(true)
      }
    } catch (error) {
      setErrors([error.response.data.message]);
    }
  };

  const desactivarMunis = async (id) => {
    try {
      const response = await UpdateMunicipioDesact(id);
      getMunis();
      setMensaje(response.data.message);
      setModalMessage(true);
    } catch (error) {
      console.log(error);
    }
  };

  const activarMunis = async (id) => {
    try {
      const response = await UpdateMunicipioActivar(id);
      getMunis();
      setMensaje(response.data.message);
      setModalMessage(true);
    } catch (error) {
      console.log(error);
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
    <MunicipioContext.Provider
      value={{
        errors,
        municipios,
        idMunicipio,
        municipiosForDepar, 
        setMunicipiosForDepar,
        setIdMunicipio,
        setMunicipios,
        getMunis,
        getMunisForDepar,
        createMunis,
        updateMunis,
        desactivarMunis,
        activarMunis,

        getMunisForDeparActivos,
        setCerrarModal,
        cerrarModal,
        municipiosActivos,
      }}
    >
      <ModalMessage
        isOpen={modalMessage}
        onClose={() => setModalMessage(false)}
        label={mensaje}
      />
      {children}
    </MunicipioContext.Provider>
  );
};

export default MunicipioContext;
