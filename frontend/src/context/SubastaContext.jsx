import React, { createContext, useContext, useEffect, useState } from "react";

import ModalMessage from "../nextui/ModalMessage";
import {
  createSubasta,
  getSubasta,
  getSubastaForUser,
  getSubastas,
  updateSubasta,
  updateSubastaActivar,
  updateSubastaDesact,
  updateSubastaEspera,
  updateSubastaProceso,
  updateSubastafecha,
  getSubastasActivasMenosCerradas,
} from "../api/api.subasta";

const SubastaContext = createContext();

export const useSubastaContext = () => {
  const context = useContext(SubastaContext)
  if (!context) {
    throw new Error('Debes usar SubastaProvider en el App')
  }
  return context;
}

export const SubastaProvider = ({ children }) => {
  const [modalMessage, setModalMessage] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [errors, setErrors] = useState([]);
  const [idSubasta, setIdSubasta] = useState(0);
  const [subastaForuser, setSubastaForUser] = useState([]);
  const [subastas, setSubastas] = useState([])
  const [subastasActivas, setSubastasActivas] = useState([])
  const [subasta, setSubasta] = useState([])
  const [cerrarModal, serCerrarModal] = useState(false)


  const getSubs = async () => {
    try {
      const response = await getSubastas()
      setSubastas(response.data)
    } catch (error) {
      console.error(error);
    }
  }

  const getSubsMenoCerradas = async () => {
    try {
      const reponse = await getSubastasActivasMenosCerradas()
      setSubastasActivas(reponse.data)
    } catch (error) {
      console.error(error);
    }
  }

  const updateDate = (id, data) => {
    try {
      const response = updateSubastafecha(id, data)
      getSubs()
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  const getSub = async (id) => {
    try {
      const response = await getSubasta(id);
      setSubasta(response.data.data)
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
      serCerrarModal(true)
      setModalMessage(true);
    } catch (error) {
      setErrors([error.response.data.message]);
    }
  };

  const updateSubs = async (id, data) => {
    try {
      const response = await updateSubasta(id, data);
      setMensaje(response.data.message);
      serCerrarModal(true)
      setModalMessage(true);
    } catch (error) {
      setErrors([error.response.data.message]);
    }
  };

  const desactivarSubs = async (id, user) => {
    try {
      const response = await updateSubastaDesact(id);
      setMensaje(response.data.message);
      setModalMessage(true);
      getSubForUser(user);
    } catch (error) {
      setErrors([error.response.data.message]);
    }
  };

  const activarSubs = async (id, user) => {
    try {
      const response = await updateSubastaActivar(id);
      setMensaje(response.data.message);
      setModalMessage(true);
      getSubForUser(user);
    } catch (error) {
      setErrors([error.response.data.message]);
    }
  };

  const EsperaSubs = async (id, user) => {
    try {
      await updateSubastaEspera(id);
      getSubForUser(user);
    } catch (error) {
      setErrors([error.response.data.message]);
    }
  };

  const ProcesoSubs = async (id) => {
    try {
      await updateSubastaProceso(id);
      getSubForUser(user);
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
        subasta,
        subastas,
        idSubasta,
        subastaForuser,
        setSubastaForUser,
        setIdSubasta,
        getSubForUser,
        getSubs,
        getSub,
        createSubs,
        updateSubs,
        desactivarSubs,
        activarSubs,

        EsperaSubs,
        ProcesoSubs,

        updateDate,

        subastasActivas,
        getSubsMenoCerradas,
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
    </SubastaContext.Provider>
  );
};

export default SubastaContext;
