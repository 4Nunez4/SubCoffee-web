import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getDeparts,
  createDeparts,
  UpdateDepartActivar,
  UpdateDepartDesact,
  updateDeparts,
  getDepart,
  getDepartsActivos,
} from "../api/api.departamentos";
import ModalMessage from "../nextui/ModalMessage";

const DeparContext = createContext();

export const useDepartContext = () => {
  const context = useContext(DeparContext)
  if (!context) {
    throw new Error('Debes usar DeparProvider en el App')
  }
  return context;
}

export const DeparProvider = ({ children }) => {
  const [modalMessage, setModalMessage] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [errors, setErrors] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [idDepartamento, setIdDepartamento] = useState(0)
  
  const [departamentosActivos, setDepartamentosActivos] = useState([]);
  const [cerrarModal, serCerrarModal] = useState(false)

  const getDepartamentos = async () => {
    try {
      const res = await getDeparts();
      setDepartamentos(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getDepartamentosActivos = async () => {
    try {
      const res = await getDepartsActivos();
      setDepartamentosActivos(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getDepartamento = async (id) => {
    try {
      const res = await getDepart(id);
      setDepartamentos(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createDepartamento = async (datos) => {
    try {
      const responsee = await createDeparts(datos);
      if(responsee.status === 200) {
        getDepartamentos();
        setMensaje(responsee.data.message);
        setModalMessage(true);
        serCerrarModal(true);
      }
    } catch (error) {
      setErrors([error.response.data.message]);
    }
  };

  const updateDepartamento = async (id, data) => {
    try {
      const response = await updateDeparts(id, data);
      if(response.status === 200) {
        getDepartamentos();
        setMensaje(response.data.message);
        setModalMessage(true);
        serCerrarModal(true);
      }
    } catch (error) {
      setErrors([error.response.data.message]);
    }
  };

  const desactivarDepartamento = async (id) => {
    try {
      await UpdateDepartDesact(id);
      getDepartamentos();
      setMensaje(response.data.message);
      setModalMessage(true);
    } catch (error) {
      console.log(error);
    }
  };

  const activarDepartamento = async (id) => {
    try {
      await UpdateDepartActivar(id);
      getDepartamentos();
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
    <DeparContext.Provider
      value={{
        errors,
        departamentos,
        idDepartamento, 
        setIdDepartamento,
        setDepartamentos,
        getDepartamentos,
        getDepartamento,
        createDepartamento,
        updateDepartamento,
        desactivarDepartamento,
        activarDepartamento,

        getDepartamentosActivos,
        departamentosActivos,
        cerrarModal, 
        serCerrarModal,
      }}
    >
      <ModalMessage
        isOpen={modalMessage}
        onClose={() => setModalMessage(false)}
        label={mensaje}
      />
      {children}
    </DeparContext.Provider>
  );
};

export default DeparContext;
