import axios from 'axios';

export const dynamicOffice = false;
export const officeId = 'centralparque';
export const baseURL = 'https://book.hospeda.in';
const https = require('https');


const api = axios.create({
  baseURL,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
});

export default api;
