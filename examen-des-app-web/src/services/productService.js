import { api } from './api'

const RESOURCE = '/products'

export default {
  getAllProducts() {
    return api.get(RESOURCE)
  },
  getProductById(id) {
    return api.get(`${RESOURCE}/${id}`)
  },
  createProduct(data) {
    return api.post(RESOURCE, data)
  },
  updateProduct(id, data) {
    return api.put(`${RESOURCE}/${id}`, data)
  },
  deleteProduct(id) {
    return api.delete(`${RESOURCE}/${id}`)
  }
}