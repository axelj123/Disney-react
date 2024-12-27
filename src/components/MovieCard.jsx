import React from 'react';
import { Link } from 'react-router-dom';

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

function MovieCard({ movie }) {
  return (
    <div className="w-[110px] md:w-[200px] flex-shrink-0">
      <Link to={`/movie/${movie.id}`}>
        <img 
          src={IMAGE_BASE_URL + movie.poster_path}
          alt={movie.title}
          className="w-full h-auto rounded-lg hover:border-[3px] border-gray-400
                   hover:scale-110 transition-all duration-150 ease-in cursor-pointer"
        />
      </Link>
    </div>
  );
}

export default MovieCard;