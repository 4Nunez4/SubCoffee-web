import axiosClient from "./axios"

export const getOfertas = () => axiosClient.get('/v1/oferta') 
export const createOferta = (data) => axiosClient.post("/v1/oferta", data)
export const getOfertasForSub = (id) => axiosClient.get(`/v1/oferta/${id}`)