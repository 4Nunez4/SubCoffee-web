import axiosClient from "./axios"

export const getPostulantes = (id) => axiosClient.get(`/v1/postulantes_sub/${id}`)
export const getPostulante = (id) => axiosClient.get(`/v1/postulantes/${id}`)
export const getPostulantesActivos = (id) => axiosClient.get(`/v1/postulantes_activos/${id}`)
export const createPostulantes = (data) => axiosClient.post("/v1/postulantes", data)
export const updatePostulantes = (id, data) => axiosClient.put(`/v1/departamentos/${id}`, data)
export const UpdatePostulanteDesact = (data) => axiosClient.put(`/v1/postulantesinactivo`, data)
export const UpdatePostulanteActivar = (id) => axiosClient.put(`/v1/postulantesactivo/${id}`)