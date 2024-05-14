import axiosClient from "./axios"

export const getVeredas = () => axiosClient.get("/v1/veredas")
export const getVeredasForMunis = (municipio) => axiosClient.get(`/v1/veredasmun/${municipio}`)
export const createVeredas = (data) => axiosClient.post("/v1/veredas", data)
export const updateVeredas = (id, data) => axiosClient.put(`/v1/veredas/${id}`, data)
export const updateVeredaDesact = (id) => axiosClient.put(`/v1/veredasdes/${id}`)
export const updateVeredaActivar = (id) => axiosClient.put(`/v1/veredasac/${id}`)