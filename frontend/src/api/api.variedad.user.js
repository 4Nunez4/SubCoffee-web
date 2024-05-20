import axiosClient from "./axios"

export const getVariedad = (id, id_finca) => axiosClient.get(`/v1/variedaduser/${id}/${id_finca}`);
export const createVariedad = (data) => axiosClient.post("/v1/variedad", data)
export const updatevariedad = (id, data) => axiosClient.put(`/v1/variedad/${id}`, data)
export const updateVariedadDesact = (id) => axiosClient.put(`/v1/variedaddes/${id}`)
export const updateVariedadActivar = (id) => axiosClient.put(`/v1/variedadac/${id}`)