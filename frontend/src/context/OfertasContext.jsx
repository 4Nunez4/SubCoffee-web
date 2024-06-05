import React, { createContext, useContext, useState } from "react";
import { createOferta, deleteOfertasForSub, getOfertas, getOfertasForSub } from "../api/api.ofertas";
import ModalMessage from "../nextui/ModalMessage";

const OfertasContext = createContext();

export const useOfertasContext = () => {
  const context = useContext(OfertasContext)
  if (!context) {
    throw new Error('Debes usar ofertaProvider en el App')
  }
  return context;
}
export const OfertaProvider = ({ children }) => {
  const [modalMessage, setModalMessage] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [ofertas, setOfertas] = useState([])

  const getOferts = async () => {
    try {
      const response = await getOfertas()
      setOfertas(response.data)
    } catch (error) {
      console.log(error);
    }
  }

  const getOfertForSub = async (id) => {
    try {
      getOfertasForSub(id).then((response) => {
        setOfertas(response.data.data)
      })
    } catch (error) {
      console.log(error);
    }
  }

  const createOfert = async (data, id) => {
    try {
      const response = await createOferta(data)
      setOfertas(response.data)
      setMensaje(response.data.message);
      setModalMessage(true);
      getOfertForSub(id)
    } catch (error) {
      console.log(error);
    }
  }

  const eliminarOfertas = async (id, user) => {
    try {
      await deleteOfertasForSub(id, user)
      getOfertForSub(id)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <OfertasContext.Provider
      value={{
        ofertas,
        getOferts,
        createOfert,
        getOfertForSub,
        eliminarOfertas
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
