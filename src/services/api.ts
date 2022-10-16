import axios from 'axios';

export const dynamicOffice = false;
export const officeId = 'centralparque';
export const baseURL = 'https://book.hospeda.in';

const api = axios.create({
  baseURL,
});

export default api;
