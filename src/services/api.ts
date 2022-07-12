import axios from 'axios';

export const officeId = 'office1';
export const baseURL = 'http://book.hospeda.in';

const api = axios.create({
  baseURL,
});

export default api;
