import axios from "axios";

const API = import.meta.env.VITE_API; 
const API_KEY = import.meta.env.VITE_API_KEY;

const getTrendingVideos = () => {
    return axios.get(`${API}/trending/all/day?api_key=${API_KEY}`);
};
const getMoviesByGenre = (id) => {
    return axios.get(`${API}/discover/movie?api_key=${API_KEY}&with_genres=${id}`);
};

const searchMovies = (query) => {
    return axios.get(`${API}/search/multi?api_key=${API_KEY}&query=${query}&language=es-ES&include_adult=false`);
}

const addToWatchlist = (movie) => {
    const watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
    if (!watchlist.some(item => item.id === movie.id)) {
        watchlist.push(movie);
        localStorage.setItem('watchlist', JSON.stringify(watchlist));
    }
};

const removeFromWatchlist = (movieId) => {
    const watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
    const updatedWatchlist = watchlist.filter(item => item.id !== movieId);
    localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
};

const getWatchlist = () => {
    return JSON.parse(localStorage.getItem('watchlist') || '[]');
};

export default {
    getTrendingVideos,
    getMoviesByGenre,
    searchMovies,
    addToWatchlist,
    removeFromWatchlist,
    getWatchlist
};