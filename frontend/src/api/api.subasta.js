import axiosClient from "./axios"

export const getSubastas = () => axiosClient.get('/v1/subasta')
export const getSubasta = (id) => axiosClient.get(`/v1/buscar/${id}`)
export const getSubastaForUser = (id) => axiosClient.get(`/v1/buscarsubforuser/${id}`)
export const createSubasta = (data) => axiosClient.post("/v1/subasta", data)
export const updateSubasta = (id, data) => axiosClient.put(`/v1/subasta/${id}`, data)
export const updateSubastaDesact = (id) => axiosClient.put(`/v1/subastades/${id}`)
export const updateSubastaActivar = (id) => axiosClient.put(`/v1/subastaac/${id}`)