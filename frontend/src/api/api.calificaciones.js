import axiosClient from "./axios";

export const createCalificaciones = (data) => axiosClient.post('/v1/calificaciones', data)
export const getCalificaciones = (id) => axiosClient.get(`/v1/calificaciones/${id}`)
export const getCalificacioUser = (id) => axiosClient.get(`/v1/calificacionForId/${id}`)
export const updateCalificaciones = (id, data) => axiosClient.get(`/v1/calificaciones/${id}`, data)