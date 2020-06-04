import axios from 'axios';

const api = axios.create({
    baseURL: 'https://projeto-filmes.herokuapp.com'
});

export default api;