import axiosClient from "./axios"

export const getTipoVaris = () => axiosClient.get("/v1/tipo_vari")
export const getTipoVarisActivas = (id, finca) => axiosClient.get(`/v1/tipo_vari_activas/${id}/${finca}`)
export const createTipoVaris = (data) => axiosClient.post("/v1/tipo_vari", data)
export const updateTipoVaris = (id, data) => axiosClient.put(`/v1/tipo_vari/${id}`, data)
export const UpdateTipoVarisDesact = (id) => axiosClient.put(`/v1/tipo_varides/${id}`)
export const UpdateTipoVarisActivar = (id) => axiosClient.put(`/v1/tipo_variac/${id}`)