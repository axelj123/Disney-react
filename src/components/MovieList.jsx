import React, { useEffect, useState } from 'react'
import GlobalApi from '../services/GlobalApi'
import MovieCard from './MovieCard';

function MovieList({genreId}) {
    const [movieList,setMovieList]=useState([])
    useEffect(()=>{
        GetMovieByGenreId();
    },[])

    const GetMovieByGenreId=()=>{
        GlobalApi.getMoviesByGenre(genreId).then(resp=>{
            setMovieList(resp.data.results)
        })
    }
  return (
    <div className='flex overflow-x-auto gap-8 scrollbar-none'>
        {movieList.map((item,index)=>(
            <MovieCard movie={item}/>
        ))}
    </div>
  )
}

export default MovieList