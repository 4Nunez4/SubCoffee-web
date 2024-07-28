import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

import ModalMessage from "../nextui/ModalMessage";
import axiosClient from "../api/axios";

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
  const [subastas, setSubastas] = useState([]);
  const [subastasActivas, setSubastasActivas] = useState([]);
  const [subasta, setSubasta] = useState([]);
  const [subastaGanador, setSubastaGanador] = useState([]);
  const [cerrarModal, serCerrarModal] = useState(false);
  const [totalDeSubastas, setTotalDeSubastas] = useState(0);
  const [totalDeSubastasGanadas, setTotalDeSubastasGanadas] = useState(0);

  const [todasLasSubastas, setTodasLasSubastas] = useState(0);
  const [subastasAbiertas, setSubastasAbiertas] = useState(0);
  const [subastasEnEspera, setSubastasEnEspera] = useState(0);
  const [subastasCerradas, setSubastasCerradas] = useState(0);
  const [subastasEnProceso, setSubastasEnProceso] = useState(0);
  const [subastasConGanadorYPrecio, setSubastasConGanadorYPrecio] = useState(0);
  const [subastasSinGanadorOPrecioInactivas, setSubastasSinGanadorOPrecioInactivas] = useState(0);
  const [subastasNoTerminadas, setSubastasNoTerminadas] = useState(0);
  const [subastasPorMes, setSubastasPorMes] = useState([]);
  const [subastasPorAno, setSubastasPorAno] = useState([]);
  const [subastasPorVariedad, setSubastasPorVariedad] = useState([]);

  const getSubs = useCallback(async () => {
    try {
      const response = await axiosClient.get('/v1/subasta')
      setSubastas(response.data)
    } catch (error) {
      console.error(error);
    }
  }, [])

  const getSubsMenoCerradas = useCallback(async () => {
    try {
      const reponse = await axiosClient.get('/v1/subastasActivasMenosCerradas');
      setSubastasActivas(reponse.data)
    } catch (error) {
      console.error(error);
    }
  }, [])

  const establecerGanador = useCallback(async(id, data) => {
    try {
      await axiosClient.put(`/v1/subastaganador/${id}`, data).then((response) => {
        getSub(id)
        getSubs()
        getSubsMenoCerradas()
        setMensaje(response.data.message);
        serCerrarModal(true)
        setModalMessage(true);
      })
    } catch (error) {
      console.error(error);
    }
  }, [])

  const destablecerGanador = useCallback(async(id, user) => {
    try {
      await axiosClient.put(`/v1/eliminardatos/${id}`).then((response) => {
        activarSubs(id, user)
        setMensaje(response.data.message);
        serCerrarModal(true)
        setModalMessage(true);
      })
    } catch (error) {
      console.error(error);
    }
  }, [])

  const getSub = useCallback(async (id) => {
    try {
      const response = await axiosClient.get(`/v1/buscar/${id}`);
      setSubasta(response.data.data)
    } catch (error) {
      console.error(error);
    }
  }, [])

  const getSubForUser = useCallback(async (id) => {
    try {
      const response = await axiosClient.get(`/v1/buscarsubforuser/${id}`);
      setSubastaForUser(response.data.data);
      setTotalDeSubastas(response.data.total_subastas)
    } catch (error) {
      console.error(error);
    }
  }, []);

  const getSubGanador = useCallback(async (id) => {
    try {
      const response = await axiosClient.get(`/v1/subastaganador/${id}`);
      setSubastaGanador(response.data.data)
      if(response.data.total_subastas_ganadas) {
        setTotalDeSubastasGanadas(response.data.total_subastas_ganadas)
      } else (
        setTotalDeSubastasGanadas(0)
      )
    } catch (error) {
      console.error(error);
    }
  }, [])

  const createSubs = useCallback(async (data, user) => {
    try {
      const response = await axiosClient.post(`/v1/subasta/${user}`, data);
      getSubForUser(user);
      setMensaje(response.data.message);
      serCerrarModal(true)
      setModalMessage(true);
    } catch (error) {
      setErrors([error.response.data.message]);
    }
  }, [])

  const updateSubs = useCallback(async (id, data, user) => {
    try {
      const response = await axiosClient.put(`/v1/subasta/${id}`, data);
      getSubForUser(user)
      setMensaje(response.data.message);
      serCerrarModal(true)
      setModalMessage(true);
    } catch (error) {
      setErrors([error.response.data.message]);
    }
  }, [])

  const desactivarSubs = useCallback(async (id, user) => {
    try {
      await axiosClient.put(`/v1/subastades/${id}`);
      getSubForUser(user);
    } catch (error) {
      setErrors([error.response.data.message]);
    }
  }, []);

  const activarSubs = useCallback(async (id, user) => {
    try {
      await axiosClient.put(`/v1/subastaac/${id}`);
      getSubForUser(user);
    } catch (error) {
      setErrors([error.response.data.message]);
    }
  }, []);

  const EsperaSubs = useCallback(async (id, user) => {
    try {
      await axiosClient.put(`/v1/espera/${id}`);
      getSubForUser(user);
    } catch (error) {
      setErrors([error.response.data.message]);
    }
  }, []);

  const ProcesoSubs = useCallback(async (id, user) => {
    try {
      await axiosClient.put(`/v1/proceso/${id}`);
      getSubForUser(user);
    } catch (error) {
      setErrors([error.response.data.message]);
    }
  }, []);

  const ListAllDatesSub = useCallback(async () => {
    try {
        const response = await axiosClient.get('/v1/subastaAll')
    
        if (response.data) {
          const resumenSubastas = response.data.resumen_subastas ? response.data.resumen_subastas[0] : {};
          const estadisticasSubastas = response.data.estadisticas_subastas || {};
          const subastasPorMes = response.data.subastas_por_mes || [];
          const subastasPorAno = response.data.subastas_por_año || [];
          const subastasPorVariedad = response.data.subastas_por_variedad || [];
          
          setTodasLasSubastas(resumenSubastas.todas_las_subastas || 0);
          setSubastasAbiertas(resumenSubastas.subastas_abiertas || 0);
          setSubastasEnEspera(resumenSubastas.subastas_en_espera || 0);
          setSubastasCerradas(resumenSubastas.subastas_cerradas || 0);
          setSubastasEnProceso(resumenSubastas.subastas_en_proceso || 0);
          
          setSubastasConGanadorYPrecio(estadisticasSubastas.subastas_con_ganador_y_precio || 0);
          setSubastasSinGanadorOPrecioInactivas(estadisticasSubastas.subastas_sin_ganador_o_precio_inactivas || 0);
          setSubastasNoTerminadas(estadisticasSubastas.subastas_no_terminadas || 0);
          
          setSubastasPorMes(subastasPorMes);
          setSubastasPorAno(subastasPorAno);
          
          setSubastasPorVariedad(subastasPorVariedad);
        }
    } catch (error) {
        console.error('Error al listar las estadisticas:', error);
    }
}, []); 

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
        subastasActivas,
        getSubsMenoCerradas,
        cerrarModal, 
        serCerrarModal,
        establecerGanador,
        getSubGanador,
        subastaGanador,
        destablecerGanador,
        totalDeSubastas,
        totalDeSubastasGanadas,

        ListAllDatesSub,
        todasLasSubastas,
        subastasAbiertas,
        subastasEnEspera,
        subastasCerradas,
        subastasEnProceso,
        subastasConGanadorYPrecio,
        subastasSinGanadorOPrecioInactivas,
        subastasNoTerminadas,
        subastasPorMes,
        subastasPorAno,
        subastasPorVariedad,
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
