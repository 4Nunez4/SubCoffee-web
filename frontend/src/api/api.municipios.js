import axiosClient from "./axios"

export const getMunicipios = () => axiosClient.get("/v1/municipios")
export const getMuniForDepartamento = (departamento) => axiosClient.get(`/v1/municipiosdep/${departamento}`)
export const createMunicipios = (data) => axiosClient.post("/v1/municipios", data)
export const updateMunicipios = (id, data) => axiosClient.put(`/v1/municipios/${id}`, data)
export const UpdateMunicipioDesact = (id) => axiosClient.put(`/v1/municipiosdes/${id}`)
export const UpdateMunicipioActivar = (id) => axiosClient.put(`/v1/municipiosac/${id}`)