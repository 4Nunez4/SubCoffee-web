import axiosClient from "./axios"

export const getFincaForUser = (user) => axiosClient.get(`/v1/finca/${user}`)
export const createFinca = (data) => axiosClient.post("/v1/finca", data)
export const updateFinca = (id, data) => axiosClient.put(`/v1/finca/${id}`, data)
export const updateFincaDesact = (id) => axiosClient.put(`/v1/fincades/${id}`)
export const updateFincaActivar = (id) => axiosClient.put(`/v1/fincaac/${id}`)