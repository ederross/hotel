import axios from 'axios';

export const apiToken = process.env.NEXT_PUBLIC_API_TOKEN;
export const credentials = btoa('' + ':' + apiToken);
export const dynamicOffice = process.env.NEXT_PUBLIC_DYNAMIC_OFFICE;
export const officeId = 'office1';
export const baseURL = process.env.NEXT_PUBLIC_BASE_URL; //'http://book.hospeda.in';
const https = require('https');

const api = axios.create({
  baseURL,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

// api.interceptors.request.use(function (config) {
//   var credentials = btoa('' + ':' + apiToken);

//   config.headers.Authorization = `Basic ${credentials}`;
//   return config;
// });

export default api;
