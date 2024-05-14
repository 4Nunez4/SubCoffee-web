import React, { createContext, useState } from "react";
import {
  getMunicipios,
  createMunicipios,
  updateMunicipios,
  UpdateMunicipioActivar,
  UpdateMunicipioDesact,
  getMuniForDepartamento,
} from "../api/api.municipios";
import ModalMessage from "../nextui/ModalMessage";

const MunicipioContext = createContext();

export const MunicipioProvider = ({ children }) => {
  const [modalMessage, setModalMessage] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [errors, setErrors] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [idMunicipio, setIdMunicipio] = useState(0);
  const [municipiosForDepar, setMunicipiosForDepar] = useState([])

  const getMunis = async () => {
    try {
      const res = await getMunicipios();
      setMunicipios(res.data);
    } catch (error) {
      console.error(error);
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
      getMunis();
      setMensaje(response.data.message);
      setModalMessage(true);
    } catch (error) {
      setErrors([error.response.data.message]);
    }
  };

  const updateMunis = async (id, data) => {
    try {
      const response = await updateMunicipios(id, data);
      getMunis();
      setMensaje(response.data.message);
      setModalMessage(true);
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
      setErrors(error.response.data);
    }
  };

  const activarMunis = async (id) => {
    try {
      const response = await UpdateMunicipioActivar(id);
      getMunis();
      setMensaje(response.data.message);
      setModalMessage(true);
    } catch (error) {
      setErrors(error.response.data);
    }
  };

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
