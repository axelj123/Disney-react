import React, { useState, useEffect } from 'react';
import { HiPlus, HiCheck } from 'react-icons/hi';
import GlobalApi from '../services/GlobalApi';

function AddToWatchlistButton({ movie }) {
    const [isInWatchlist, setIsInWatchlist] = useState(false);

    useEffect(() => {
        const watchlist = GlobalApi.getWatchlist();
        setIsInWatchlist(watchlist.some(item => item.id === movie.id));
    }, [movie.id]);

    const handleClick = () => {
        if (isInWatchlist) {
            GlobalApi.removeFromWatchlist(movie.id);
        } else {
            GlobalApi.addToWatchlist(movie);
        }
        setIsInWatchlist(!isInWatchlist);
    };

    return (
        <button
            onClick={handleClick}
            className='p-2 bg-black bg-opacity-50 rounded-full hover:bg-opacity-75 transition-all'
        >
            {isInWatchlist ? (
                <HiCheck className='text-green-500 text-xl' />
            ) : (
                <HiPlus className='text-white text-xl' />
            )}
        </button>
    );
}

export default AddToWatchlistButton;