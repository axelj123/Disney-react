import axios from "axios";

const API = import.meta.env.VITE_API; // Cambia esto
const API_KEY = import.meta.env.VITE_API_KEY; // Cambia esto

const getTrendingVideos = () => {
    return axios.get(`${API}/trending/all/day?api_key=${API_KEY}`);
};

export default {
    getTrendingVideos
};
