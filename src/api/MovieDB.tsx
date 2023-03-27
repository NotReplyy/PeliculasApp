import axios from 'axios';

const movieDB = axios.create({
    baseURL: 'https://api.themoviedb.org/3/movie',
    params: {
        api_key: '46d7bda645e8df22c8346c4a98659af8',
        language: 'es-ES',
    },
});

export default movieDB;
