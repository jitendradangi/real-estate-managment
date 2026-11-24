import api from './api';

export const createInquiry = (data) =>
  api.post('/api/inquiries', data).then((r) => r.data);
