import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
})

export const createUser = (payload) => api.post(`user`)
export const getUserById = (id) => api.get(`/user/${id}`)
export const updateUser = (id, payload) => api.put(`/user/${id}`, payload)
export const deleteUser = (id) => api.delete(`/user/${id}`)


export const addNote = (payload) => api.post(`/notes`, payload)
export const getNote = () => api.get(`/notes`)
export const updateNote = (id, payload) => api.put(`/notes/${id}`, payload)
export const deleteNote = (id) => api.delete(`/notes/${id}`)

const apis = {
    addNote,
    getNote,
    updateNote,
    deleteNote,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
}

export default apis