import axios from 'axios';

export const baseURL = 'https://pokeapi.co/api/v2/pokemon';

const api = axios.create({
  baseURL,
});

export default api;
