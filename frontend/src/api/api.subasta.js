import axiosClient from "./axios";

export const getSubastas = () => axiosClient.get('/v1/subasta');
export const getSubastasActivasMenosCerradas = () => axiosClient.get('/v1/subastasActivasMenosCerradas');
export const getSubasta = (id) => axiosClient.get(`/v1/buscar/${id}`);
export const getSubastaForUser = (id) => axiosClient.get(`/v1/buscarsubforuser/${id}`);
export const getSubastaGanador = (id) => axiosClient.get(`/v1/subastaganador/${id}`);

export const createSubasta = (data, id) => axiosClient.post(`/v1/subasta/${id}`, data);

export const updateSubasta = (id, data) => axiosClient.put(`/v1/subasta/${id}`, data);
export const updateSubastaDesact = (id) => axiosClient.put(`/v1/subastades/${id}`);
export const updateSubastaActivar = (id) => axiosClient.put(`/v1/subastaac/${id}`);
export const updateSubastafecha = (id, data) => axiosClient.put(`/v1/subastafecha/${id}`, data);
export const subastaGanadorDesingar = (id) => axiosClient.put(`/v1/eliminardatos/${id}`);
export const subastaGanadorAsingar = (id, data) => axiosClient.put(`/v1/subastaganador/${id}`, data);
export const updateSubastaEspera = (id) => axiosClient.put(`/v1/espera/${id}`);
export const updateSubastaProceso = (id) => axiosClient.put(`/v1/proceso/${id}`);

export const listDatesSubs = () => axiosClient.get('/v1/subastaAll')