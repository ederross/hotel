import axios from 'axios';

export const dynamicOffice = true;
export const officeId = 'office1';
export const baseURL = 'https://book.hospeda.in';

const api = axios.create({
  baseURL,
});

export default api;
