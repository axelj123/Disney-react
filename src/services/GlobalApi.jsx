import axios from "axios";

const movieBaseUrl = "https://api.themoviedb.org/3";
const api_key = 'b2c46d4040f57817267909e152883df9';

// Define getTrendingVideos como una función que retorna la promesa de axios
const getTrendingVideos = () => {
    return axios.get(`${movieBaseUrl}/trending/all/day?api_key=${api_key}`);
};

export default {
    getTrendingVideos
};
