import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Product Service
export const productService = {
  getAllProducts: () => api.get('/products/products'),
  getProductById: (id) => api.get(`/products/products/${id}`),
  createProduct: (product) => api.post('/products/products', product),
  updateProduct: (id, product) => api.put(`/products/products/${id}`, product),
  deleteProduct: (id) => api.delete(`/products/products/${id}`),
  searchProducts: (name) => api.get(`/products/products/search?name=${name}`),
};

// Order Service
export const orderService = {
  getAllOrders: () => api.get('/orders/orders'),
  getOrderById: (id) => api.get(`/orders/orders/${id}`),
  createOrder: (order) => api.post('/orders/orders', order),
  updateOrderStatus: (id, status) => api.patch(`/orders/orders/${id}/status?status=${status}`),
  cancelOrder: (id) => api.delete(`/orders/orders/${id}`),
  getOrdersByCustomer: (email) => api.get(`/orders/orders/customer/${email}`),
};

export default api;
