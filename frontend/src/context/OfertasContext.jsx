import React, { createContext, useContext, useState } from "react";
import { createOferta, getOfertas, updateOferta } from "../api/api.ofertas";
import ModalMessage from "../nextui/ModalMessage";

const OfertasContext = createContext();

export const useOfertasContext = () => {
  const context = useContext(OfertasContext);
  if (!context) {
    throw new Error("Debes usar OfertasProvider en el App"); // Correct the error message
  }
  return context;
}

export const OfertasProvider = ({ children }) => {
  const [modalMessage, setModalMessage] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [errors, setErrors] = useState([]);
  const [ofertas, setOfertas] = useState([]); // Rename 'fincas' to 'ofertas'
  const [idOferta, setIdOferta] = useState(0); // Rename 'idFinca' to 'idOferta'
  const [cerrarModal, setCerrarModal] = useState(false); // Rename 'serCerrarModal' to 'setCerrarModal'

  const getOfertasData = async () => {
    try {
      const res = await getOfertas(); // Use the correct API function for fetching ofertas
      setOfertas(res.data.data);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const createOfertas = async (data) => {
    try {
      const response = await createOferta(data); // Use the correct API function for creating oferta
      getOfertasData();
      setMensaje(response.data.message);
      setModalMessage(true);
      setCerrarModal(true);
    } catch (error) {
      setErrors([error.response.data.message]);
    }
  };

  const updateOfertas = async (id, data) => {
    try {
      const response = await updateOferta(id, data); // Use the correct API function for updating oferta
      getOfertasData();
      setCerrarModal(true);
      setMensaje(response.data.message);
      setModalMessage(true);
    } catch (error) {
      setErrors([error.response.data.message]);
    }
  };

  return (
    <OfertasContext.Provider
      value={{
        errors,
        ofertas, // Rename 'fincas' to 'ofertas'
        idOferta, // Rename 'idFinca' to 'idOferta'
        setIdOferta, // Rename 'setIdFinca' to 'setIdOferta'
        getOfertasData, // Rename 'getFincaUser' to 'getOfertasData'
        createOfertas, // Rename 'createFincas' to 'createOfertas'
        updateOfertas, // Rename 'updateFincas' to 'updateOfertas'

        cerrarModal, // Rename 'cerrarModal' to 'setCerrarModal'
        setCerrarModal, // Rename 'serCerrarModal' to 'setCerrarModal'
      }}
    >
      <ModalMessage
        isOpen={modalMessage}
        onClose={() => setModalMessage(false)}
        label={mensaje}
      />
      {children}
    </OfertasContext.Provider>
  );
};

export default OfertasContext;
