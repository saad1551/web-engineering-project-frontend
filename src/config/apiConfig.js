import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:4000/api', // Base URL set here
});

export default instance;
