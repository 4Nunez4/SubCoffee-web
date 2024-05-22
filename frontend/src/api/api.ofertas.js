import axiosClient from "./axios"

export const getOfertas = () => axiosClient.get("/v1/municipios")
export const createOferta = (data) => axiosClient.post("/v1/oferta", data)
export const getOfertasId = (id) => axiosClient.get(`/v1/oferta/${id}`)
export const updateOferta = (id, data) => axiosClient.put(`/v1/oferta/${id}`, data)
export const deleteOferta = (id) => axiosClient.get(`/v1/oferta/${id}`)

/* export const UpdateMunicipioDesact = (id) => axiosClient.put(`/v1/ofertades/${id}`)
export const UpdateMunicipioActivar = (id) => axiosClient.put(`/v1/ofertaac/${id}`) */