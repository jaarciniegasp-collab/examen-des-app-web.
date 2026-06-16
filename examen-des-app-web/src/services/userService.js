import { api } from './api'

const RESOURCE = '/users'

export default {
  getAllUsers() {
    return api.get(RESOURCE)
  },
  getUserById(id) {
    return api.get(`${RESOURCE}/${id}`)
  },
  createUser(data) {
    return api.post(RESOURCE, data)
  },
  updateUser(id, data) {
    return api.put(`${RESOURCE}/${id}`, data)
  },
  deleteUser(id) {
    return api.delete(`${RESOURCE}/${id}`)
  }
}