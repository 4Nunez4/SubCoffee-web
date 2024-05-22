import axiosClient from "./axios"

export const getNotificaciones = () => axiosClient.get('/v1/notificaciones')
export const getNotificacionesForUser = (id) => axiosClient.get(`/v1/notificaciones/${id}`)
export const createNotificaciones = (data) => axiosClient.post("/v1/notificaciones", data)
export const updateNotificaciones = (id, data) => axiosClient.put(`/v1/notificaciones/${id}`, data)
