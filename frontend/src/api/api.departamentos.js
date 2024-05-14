import axiosClient from "./axios"

export const getDeparts = () => axiosClient.get("/v1/departamentos")
export const createDeparts = (data) => axiosClient.post("/v1/departamentos", data)
export const updateDeparts = (id, data) => axiosClient.put(`/v1/departamentos/${id}`, data)
export const UpdateDepartDesact = (id) => axiosClient.put(`/v1/departamentosdes/${id}`)
export const UpdateDepartActivar = (id) => axiosClient.put(`/v1/departamentosac/${id}`)