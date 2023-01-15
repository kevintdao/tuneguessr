import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;

export const getDailySong = async () => axios.get('/spotify/daily');

export const getGames = async () => axios.get('/games');
