import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import {
  getFincaForUser,
  createFinca,
  updateFinca,
  updateFincaActivar,
  updateFincaDesact,
  getFincaForUserActivas,
  getFincaForUserOne,
} from "../api/api.finca";
import ModalMessage from "../nextui/ModalMessage";

const FincaContext = createContext();

export const useFincaContext = () => {
  const context = useContext(FincaContext)
  if (!context) {
    throw new Error('Debes usar MunicipioProvider en el App')
  }
  return context;
}

export const FincaProvider = ({ children }) => {
  const [modalMessage, setModalMessage] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [errors, setErrors] = useState([]);
  const [fincas, setFincas] = useState([]);
  const [finca, setFinca] = useState([]);
  const [fincasActivas, setFincasActivas] = useState([]);
  const [idFinca, setIdFinca] = useState(0)
  const [cerrarModal, setCerrarModal] = useState(false)

  const getFincaUser = async (user) => {
    try {
      const res = await getFincaForUser(user);
      setFincas(res.data.data);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const getFincaUserOne = async (finca) => {
    try {
      await getFincaForUserOne(finca).then((res) => {
        setFinca(res.data.data);
      })
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const getFincaUserActivas = async (user) => {
    try {
      const res = await getFincaForUserActivas(user);
      setFincasActivas(res.data.data);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const createFincas = useCallback(async (data, user) => {
    try {
      const response = await createFinca(data);
      if(response.status === 200) {
        getFincaUser(user);
        setMensaje(response.data.message);
        setModalMessage(true);
        setCerrarModal(true)
      }
    } catch (error) {
      setErrors([error.response.data.message]);
    }
  }, [])  

  const updateFincas = async (id, data, user) => {
    try {
      const response = await updateFinca(id, data);
      if(response.status === 200) {
        getFincaUser(user);
        setCerrarModal(true)
        setMensaje(response.data.message);
        setModalMessage(true);
      }
    } catch (error) {
      setErrors([error.response.data.message]);
    }
  };

  const desactivarFincas = async (id, user) => {
    try {
      const response = await updateFincaDesact(id);
      getFincaUser(user);
      setMensaje(response.data.message);
      setModalMessage(true);
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  const activarFincas = async (id, user) => {
    try {
      const response = await updateFincaActivar(id);
      getFincaUser(user);
      setMensaje(response.data.message);
      setModalMessage(true);
    } catch (error) {
      setErrors(error.response.data);
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
    <FincaContext.Provider
      value={{
        errors,
        fincas,
        idFinca,
        setIdFinca,
        setFincas,
        getFincaUser,
        createFincas,
        updateFincas,
        desactivarFincas,
        activarFincas,
        getFincaUserActivas,
        fincasActivas,
        cerrarModal,
        setCerrarModal,
        getFincaUserOne,
        finca
      }}
    >
      <ModalMessage
        isOpen={modalMessage}
        onClose={() => setModalMessage(false)}
        label={mensaje}
      />
      {children}
    </FincaContext.Provider>
  );
};

export default FincaContext;
