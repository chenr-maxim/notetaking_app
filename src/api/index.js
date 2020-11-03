import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
})

// export const getUserById = (id, payload) => api.get(`/users/${id}`, payload)
// export const createUser = (payload) => api.post

export const addNote = (payload) => api.post(`/notes`, payload)
export const getNote = () => api.get(`/notes`)
export const updateNote = (id, payload) => api.put(`/notes/${id}`, payload)
export const deleteNote = (id) => api.delete(`/notes/${id}`)

const apis = {
    addNote,
    getNote,
    updateNote,
    deleteNote
}

export default apis