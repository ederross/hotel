import axios from 'axios';

export const apiToken = process.env.NEXT_PUBLIC_API_TOKEN;
export const credentials = Buffer.from('' + ':' + apiToken).toString('base64');
export const dynamicOffice =
  process.env.NEXT_PUBLIC_DYNAMIC_OFFICE === 'true' ? true : false;
export const officeId = 'hotelcentralparque';
export const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
const https = require('https');

const api = axios.create({
  baseURL,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

export default api;
