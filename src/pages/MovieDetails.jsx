import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AddToWatchlistButton from "../components/AddToWatchlistButton";
import { PlayCircle } from "lucide-react";

const API = import.meta.env.VITE_API;
const API_KEY = import.meta.env.VITE_API_KEY;

export default function MovieDetails() {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${API}/movie/${id}?api_key=${API_KEY}&language=es-ES`
        );
        setMovieDetails(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getMovieDetails();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!movieDetails) {
    return <div className="text-white text-center">No se encontraron detalles.</div>;
  }

  return (
    <div className="relative min-h-screen">
      {/* Hero Banner */}
      <div className="relative h-[70vh] w-full">
        <img
          src={`https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`}
          alt={movieDetails.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020924] to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#020924] to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute top-[20%] left-0 right-0 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {movieDetails.title}
          </h1>

          {/* Action Buttons */}
          <div className="flex gap-4 mb-8">
            <button className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded-md hover:bg-opacity-80 transition">
              <PlayCircle className="w-6 h-6" />
              <span className="font-semibold">Reproducir</span>
            </button>
            <AddToWatchlistButton movie={movieDetails} />
          </div>

          {/* Movie Info */}
          <div className="grid md:grid-cols-[300px,1fr] gap-8">
            <img
              src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
              alt={movieDetails.title}
              className="w-full rounded-lg shadow-2xl"
            />
            
            <div className="text-white">
              <p className="text-lg mb-6 leading-relaxed">
                {movieDetails.overview}
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-gray-400 font-medium mb-1">Fecha de estreno</h3>
                  <p className="text-lg">{movieDetails.release_date}</p>
                </div>
                
                <div>
                  <h3 className="text-gray-400 font-medium mb-1">Calificación</h3>
                  <p className="text-lg flex items-center gap-2">
                    ⭐ {movieDetails.vote_average.toFixed(1)}/10
                  </p>
                </div>
                
                <div>
                  <h3 className="text-gray-400 font-medium mb-1">Duración</h3>
                  <p className="text-lg">{movieDetails.runtime} minutos</p>
                </div>
                
                <div className="col-span-2 md:col-span-3">
                  <h3 className="text-gray-400 font-medium mb-1">Géneros</h3>
                  <div className="flex flex-wrap gap-2">
                    {movieDetails.genres.map((genre) => (
                      <span
                        key={genre.id}
                        className="bg-white/10 px-3 py-1 rounded-full text-sm"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}