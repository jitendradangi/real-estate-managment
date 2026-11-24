import api from './api';

export const getProperties = (params = {}) =>
  api.get('/api/properties', { params }).then((r) => r.data);

export const getFeaturedProperties = () =>
  api.get('/api/properties/featured').then((r) => r.data);

export const getPropertyById = (id) =>
  api.get(`/api/properties/${id}`).then((r) => r.data);

export const createProperty = (data) =>
  api.post('/api/properties', data).then((r) => r.data);
