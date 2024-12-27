import React, { useEffect, useRef, useState } from 'react';
import GlobalApi from '../services/GlobalApi';
import MovieCard from './MovieCard';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';
import LargeMovieCard from './LargeMovieCard';

function MovieList({ genreId, index_ }) {
    const [movieList, setMovieList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const elementRef = useRef(null);

    useEffect(() => {
        fetchMovies();
    }, [genreId]); 

    const fetchMovies = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await GlobalApi.getMoviesByGenre(genreId);
            setMovieList(response.data.results);
        } catch (err) {
            setError('Failed to fetch movies. Please try again later.');
            console.error('Error fetching movies:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const slideRight = (element) => {
        if (element) {
            element.scrollLeft += 500;
        }
    };

    const slideLeft = (element) => {
        if (element) {
            element.scrollLeft -= 500;
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-40">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-white text-center py-4">
                {error}
            </div>
        );
    }

    return (
        <div className="relative">
            <IoChevronBackOutline 
                onClick={() => slideLeft(elementRef.current)}
                className={`text-[50px] text-white p-2 z-10 cursor-pointer hidden md:block absolute 
                          ${index_ % 3 === 0 ? 'mt-[80px]' : 'mt-[150px]'}`}
            />

            <div 
                ref={elementRef} 
                className="flex overflow-x-auto gap-8 scrollbar-hide pt-5 pb-5 px-3 scroll-smooth"
            >
                {movieList.map((item, index) => (
                    <React.Fragment key={item.id}>
                        {index_ % 3 === 0 ? 
                            <LargeMovieCard movie={item} /> : 
                            <MovieCard movie={item} />
                        }
                        
                    </React.Fragment>
                ))}
            </div>

            <IoChevronForwardOutline 
                onClick={() => slideRight(elementRef.current)}
                className={`text-[50px] text-white hidden md:block p-2 cursor-pointer z-10 top-0 absolute right-0
                          ${index_ % 3 === 0 ? 'mt-[80px]' : 'mt-[150px]'}`}
            />
        </div>
    );
}

export default MovieList;