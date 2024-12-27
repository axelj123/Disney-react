import React from 'react';
import { Link } from 'react-router-dom';  

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

function LargeMovieCard({ movie }) {
  return (
    <section className='hover:scale-110 transition-all duration-150 ease-in'>

      <Link to={`/movie/${movie.id}`}>
        <img 
          src={IMAGE_BASE_URL + movie.backdrop_path} 
          className='w-[110px] md:w-[260px] rounded-lg hover:border-[3px] border-gray-400 cursor-pointer' 
          alt={movie.title}
        />
        <h2 className='w-[110px] md:w-[260px] mt-2'>{movie.title}</h2>
      </Link>
    </section>
  );
}

export default LargeMovieCard;
