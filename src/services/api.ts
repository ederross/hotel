import axios from 'axios';

export const apiToken = 'e2plX0JmfCNsP15VWiB7QHIl';
export const credentials = Buffer.from('' + ':' + apiToken).toString('base64');
export const dynamicOffice = true;
export const officeId = 'office1';
export const baseURL = 'http://book.hospeda.in';
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
